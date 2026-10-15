# Scaling Human brand resources

Reusable original artwork for the Scaling Human website, GitHub organization,
profiles and future project materials. The website presents the animation without
a download link. This repository folder is the place to retrieve reusable files.

## Logo

The two equal nodes represent carbon-based human intelligence (polished black)
and silicon-based machine intelligence (polished silver), linked by one straight
line. No lettering, atom orbits or face imagery is part of this mark.

| Format | Sizes | Use |
|---|---|---|
| [PNG with off-white tile](logo/) | 32, 64, 128, 256, 512, 1024, 2048 square pixels | Avatars, favicons and dark or light UI |
| [Transparent PNG](logo/) | 32, 64, 128, 256, 512, 1024, 2048 square pixels | Light backgrounds and compositing |
| [Current deployed logo](logo/scalinghuman-logo-current-512.png) | 512 square pixels | Exact website and GitHub avatar artwork |

The larger logo exports are rendered from the procedural geometry at 2048 pixels
and downsampled, rather than enlarged from the deployed 512px PNG. The transparent
black node needs a light surrounding surface to remain visible. Keep the nodes
equal in size and preserve the line, spacing and proportions.

## Animation and stills

| Size | GIF | MP4 | Poster PNG |
|---|---|---|---|
| 320 by 180 | [GIF](animation/scalinghuman-connection-320x180.gif) | [MP4](animation/scalinghuman-connection-320x180.mp4) | [Poster](animation/scalinghuman-poster-320x180.png) |
| 640 by 360 | [GIF](animation/scalinghuman-connection-640x360.gif) | [MP4](animation/scalinghuman-connection-640x360.mp4) | [Poster](animation/scalinghuman-poster-640x360.png) |
| 854 by 480 | [GIF](animation/scalinghuman-connection-854x480.gif) | [MP4](animation/scalinghuman-connection-854x480.mp4) | [Poster](animation/scalinghuman-poster-854x480.png) |

All animations are six seconds at 15 fps, without audio. GIFs loop. The largest
animation is the native render resolution; smaller versions are reduced from it.
Use MP4 on websites for playback controls and a smaller transfer size. Use GIF
in GitHub Markdown where motion is useful. Use the static logo for the avatar.

Copy: Human insight + machine capability; Intelligence, together.; Scaling Human.
The artwork contains no copied frames or source-video text. It is a visual metaphor,
not a literal atomic model or a claim that dot-and-line marks are unique.

## Rebuild

Requires Python with Pillow and an FFmpeg binary. Supply a font path if the default
macOS Arial path is unavailable. Rebuild the native animation first, then exports:

```sh
python3 scripts/build-connection-animation.py /path/to/ffmpeg /tmp/connection /path/to/font.ttf
# Copy the chosen native files into public/assets/connection and the logo paths.
python3 scripts/build-brand-resources.py /path/to/website /path/to/ffmpeg /path/to/font.ttf
```

The exporter uses the currently committed native artwork and outputs these files.
[manifest.json](manifest.json) records dimensions, byte sizes, GIF duration and SHA-256
checksums. The source scripts are in [scripts](../../../scripts/).
The website workflow is documented in [website-workflow.md](../../../docs/website-workflow.md).
