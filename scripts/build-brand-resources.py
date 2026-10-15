"""Build reusable exports from the original Scaling Human procedural artwork."""
from pathlib import Path
import sys, subprocess, shutil, hashlib, json
from PIL import Image, ImageDraw

repo=Path(sys.argv[1]); ff=sys.argv[2]
out=repo/'resources/branding/scaling-human'
logos=out/'logo'; motion=out/'animation'
logos.mkdir(parents=True,exist_ok=True);motion.mkdir(parents=True,exist_ok=True)
source=repo/'scripts/build-connection-animation.py'
namespace={'__file__':str(source)}
old=sys.argv;sys.argv=[str(source),ff,str(out/'work')]+([old[3]] if len(old)>3 else [])
exec(source.read_text().split('frames=[frame')[0],namespace)
sys.argv=old
master=Image.new('RGBA',(2048,2048),(0,0,0,0));d=ImageDraw.Draw(master)
d.line([(154*4,211*4),(358*4,301*4)],fill=(144,151,156),width=40)
for x,y,s in [(154*4,211*4,False),(358*4,301*4,True)]:
    dot=namespace['sphere'](260,s);master.alpha_composite(dot,(x-260,y-260))
for size in [32,64,128,256,512,1024,2048]:
    transparent=master.resize((size,size),Image.Resampling.LANCZOS)
    tile=Image.new('RGBA',(size,size),(247,246,242,255));tile.alpha_composite(transparent)
    tile.convert('RGB').save(logos/f'scalinghuman-logo-{size}.png')
    transparent.save(logos/f'scalinghuman-logo-transparent-{size}.png')
# Preserve the exact currently deployed / uploaded 512px artwork as the canonical snapshot.
shutil.copy2(repo/'public/assets/logos/scalinghuman-connection.png',logos/'scalinghuman-logo-current-512.png')
for width,height in [(320,180),(640,360),(854,480)]:
    stem=motion/f'scalinghuman-connection-{width}x{height}'
    source_mp4=repo/'public/assets/connection/scalinghuman-connection.mp4'
    if width==854:
        shutil.copy2(source_mp4,stem.with_suffix('.mp4'))
    else:
        subprocess.run([ff,'-y','-loglevel','error','-i',str(source_mp4),'-vf',f'scale={width}:{height}:flags=lanczos','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(stem.with_suffix('.mp4'))],check=True)
    subprocess.run([ff,'-y','-loglevel','error','-i',str(source_mp4),'-filter_complex',f'fps=15,scale={width}:{height}:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse','-loop','0',str(stem.with_suffix('.gif'))],check=True)
    poster=Image.open(repo/'public/assets/connection/scalinghuman-connection-poster.png')
    poster.resize((width,height),Image.Resampling.LANCZOS).save(motion/f'scalinghuman-poster-{width}x{height}.png')
(out/'work').rmdir()
manifest=[]
for f in sorted(out.rglob('*')):
    if f.is_file() and f.name != "manifest.json":
        entry={'path':f.relative_to(out).as_posix(),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
        if f.suffix in ['.png','.gif']:
            with Image.open(f) as im:
                entry['width'],entry['height']=im.size
                if f.suffix=='.gif':
                    total=0
                    for i in range(im.n_frames):im.seek(i);total+=im.info.get('duration',0)
                    entry['duration_ms']=total
                    assert total==6000,(f,total)
        manifest.append(entry)
(out/'manifest.json').write_text(json.dumps({'assets':manifest},indent=2)+'\n')
print(f'Created and checked {len(manifest)} reusable media assets.')
