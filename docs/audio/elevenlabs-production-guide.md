# Audio Production Guide

This project was prepared for ElevenLabs, but the free tier is currently
blocked by ElevenLabs abuse detection for synthesis on this account. The
working zero-cost production path for this phase is local macOS speech output.

## Current Working Workflow

Agent clips are generated from:

- `docs/audio/elevenlabs-voice-manifest.csv`
- `docs/audio/elevenlabs-lines.txt`

Using:

- `say`
- `.wav` output in `public/audio/agents/`

The runtime now prefers:

1. `.wav`
2. `.m4a`
3. `.mp3`

for agent voice playback.

## Re-Generate The Agent Pack

Run:

```bash
python3 - <<'PY'
import csv
import subprocess
from pathlib import Path

root = Path.cwd()
manifest = root / 'docs/audio/elevenlabs-voice-manifest.csv'
out_dir = root / 'public/audio/agents'
out_dir.mkdir(parents=True, exist_ok=True)

with manifest.open() as f:
    rows = list(csv.DictReader(f))

for row in rows:
    subprocess.run(
        [
            'say',
            '-v', row['render_voice'],
            '-r', '188',
            '-o', str(out_dir / row['filename']),
            '--data-format=LEI16@22050',
            row['script'],
        ],
        check=True,
    )
PY
```

## UI Audio Still Separate

This only completes the agent voice layer.

UI sounds are still expected in:

- `public/audio/ui/click.mp3`
- `public/audio/ui/transition.mp3`
- `public/audio/ui/activate.mp3`
- `public/audio/ui/keystroke.mp3`
- `public/audio/ui/ambient-hq.mp3`

## Verification

Run:

```bash
npx tsc --noEmit
npx next build --webpack
```

Then verify in the app:

- opening an agent plays that agent clip
- mute still silences playback
- direct agent pages still build cleanly
