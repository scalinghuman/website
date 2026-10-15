from pathlib import Path
import math, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(sys.argv[2]) if len(sys.argv)>2 else Path(__file__).parent
ROOT.mkdir(parents=True,exist_ok=True)
W, H, FPS = 854, 480, 15
BG = (247, 246, 242)
FONT = sys.argv[3] if len(sys.argv)>3 else '/System/Library/Fonts/Supplemental/Arial.ttf'
font = ImageFont.truetype(FONT, 27)
small = ImageFont.truetype(FONT, 19)

def sphere(radius, silver=False):
    target = radius * 2
    radius *= 3
    size = radius * 2
    out = Image.new('RGBA', (size, size))
    pix = out.load()
    for y in range(size):
        for x in range(size):
            nx, ny = (x-radius+.5)/radius, (y-radius+.5)/radius
            q = nx*nx+ny*ny
            if q > 1: continue
            z = math.sqrt(1-q)
            light = max(0, -.4*nx-.55*ny+.72*z)
            shine = math.exp(-((nx+.31)**2+(ny+.36)**2)/.026)
            v = int(min(255, (85+138*light+42*shine) if silver else (9+39*light+152*shine)))
            pix[x,y] = (v, min(255,v+2), min(255,v+3),255)
    return out.resize((target,target),Image.Resampling.LANCZOS)

sprites = {(r,s):sphere(r,s) for r in [8,10,12,14,16,18,20,22,24,26,28,30] for s in [False,True]}

def ease(t):
    t=max(0,min(1,t));return t*t*(3-2*t)

def lerp(a,b,t):return a+(b-a)*t

def label(draw,text,y,font=font):
    draw.text((W/2,y),text,font=font,anchor='mm',fill=(35,41,46))

def frame(t):
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
    points=[]
    for i in range(12):
        side=i%2; k=i//2; angle=k*math.tau/6
        start=(260+side*334+math.cos(angle)*57,207+math.sin(angle)*57)
        network=(427+math.cos(i*math.tau/12)*126,207+math.sin(i*math.tau/12)*92)
        end=(337+side*180,167+side*80)
        a=ease((t-.4)/1.7);b=ease((t-3.1)/1.5)
        pos=(lerp(lerp(start[0],network[0],a),end[0],b),lerp(lerp(start[1],network[1],a),end[1],b))
        points.append(pos)
    intensity=ease((t-1.2)/.9)*(1-ease((t-3.1)/1.2))
    if intensity>0:
        shade=int(247-105*intensity)
        for i in range(12):
            for j in range(i+1,12):
                if (i+j)%3==0 or j==i+1:
                    d.line([points[i],points[j]],fill=(shade,shade,shade),width=1)
    b=ease((t-3.1)/1.5)
    if b>0:
        d.line([(337,167),(517,247)], fill=(int(247-100*b),)*3,width=3)
    radius=round(lerp(12,30,b)/2)*2
    for i,(x,y) in enumerate(points):
        im.paste(sprites[radius,bool(i%2)],(round(x-radius),round(y-radius)),sprites[radius,bool(i%2)])
    if t<2.2:label(d,'Human insight + machine capability',368)
    elif t<4.5:label(d,'Intelligence, together.',368)
    else:label(d,'Scaling Human',368)
    return im

frames=[frame(i/FPS) for i in range(90)]
frames[-1].save(ROOT/'scalinghuman-connection-poster.png')
frames[0].save(ROOT/'scalinghuman-connection.gif',save_all=True,append_images=frames[1:],duration=[67,67,66]*30,loop=0,optimize=True)
ff=sys.argv[1]
p=subprocess.Popen([ff,'-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'scalinghuman-connection.mp4')],stdin=subprocess.PIPE)
for f in frames:p.stdin.write(f.tobytes())
p.stdin.close();assert p.wait()==0

logo=Image.new('RGB',(512,512),BG);d=ImageDraw.Draw(logo)
d.line([(154,211),(358,301)],fill=(144,151,156),width=10)
for x,y,s in [(154,211,False),(358,301,True)]:
    dot=sphere(65,s);logo.paste(dot,(x-65,y-65),dot)
logo.save(ROOT/'scalinghuman-connection-logo.png')
logo.resize((64,64),Image.Resampling.LANCZOS).save(ROOT/'scalinghuman-connection-favicon.png')
board=Image.new('RGB',(1024,512),BG);board.paste(logo,(0,0));board.paste(logo.convert('L').convert('RGB'),(512,0));board.save(ROOT/'scalinghuman-logo-review.png')
print('Created original six-second animation, poster, logo and favicon.')
