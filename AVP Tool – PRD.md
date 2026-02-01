# AVP Tool – Product Requirements Document

**Project Name**: AVP (Audio-Visual Package) Tool  
**Version**: 1.0 (MVP)  
**Date**: January 2026  
**Target Users**: Educators creating short narrated lessons (typically <10 minutes)  
**Status**: MVP planning & early implementation

## 1. Overview

AVP is a lightweight, web-based tool that lets educators create and play interactive narrated lessons packaged as a single `.avp` file (ZIP archive).  

The format combines:
- One audio narration file
- Images / simple text overlays shown at precise timestamps
- Optional transcript (.srt or plain text)
- Optional poster/thumbnail image

Two main deliverables:
- **Reusable React Player component** — `<AVPPlayer src={...} />`
- **Creator web app** — self-hosted tool to build and export `.avp` files

## 2. Goals & Non-Functional Requirements

| Goal / Constraint               | Target / Rule                                      |
|--------------------------------|----------------------------------------------------|
| Max file size                  | < 10 MB (warn at ~8 MB during export)             |
| Max lesson duration            | < 10 minutes                                      |
| Max keyframes                  | 20–50 without noticeable lag                      |
| Deployment                     | Fully client-side player; creator has server proxy |
| API keys                       | Never exposed in browser; stored server-side .env  |
| Cost                           | Free tool (user provides own API keys)            |
| Animations                     | Basic show/hide only; complex → use GIF/Lottie/video |
| Accessibility                  | ARIA live regions for changing text, keyboard nav |
| Mobile support                 | Responsive layout, touch seek, orientation aware  |
| Browser support (MVP)          | Recent Chrome, Edge, Firefox, Safari              |

## 3. Manifest Schema (manifest.json inside .avp ZIP)

```json
{
  "version": "1.0",
  "title": "Photosynthesis Basics",
  "duration": 342.5,              // in seconds (optional, can be read from audio)
  "audio": "narration.mp3",       // filename inside zip
  "poster": "thumbnail.jpg",      // optional poster image filename
  "transcript": "transcript.srt", // optional .srt or .vtt filename
  "keyframes": [
    {
      "time": 12.3,
      "type": "show",
      "target": "img1",
      "content": { "src": "diagram1.webp", "alt": "Chloroplast structure" }
    },
    {
      "time": 45.0,
      "type": "show",
      "target": "text1",
      "content": "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"
    },
    {
      "time": 120.5,
      "type": "hide",
      "target": "img1"
    }
  ]
}
```

Allowed targets: unique strings (`img1`, `textA`, `equationBox`, etc.)

## 4. Core User Stories (MVP)

### As an educator (Creator)
- I can input lesson text and generate audio via TTS (Google Cloud default, others pluggable)
- I can upload my own audio file instead of generating
- I can upload or auto-generate a timed transcript
- I can upload images and place them at specific timestamps (show/hide)
- I can add simple text overlays at timestamps
- I can scrub a preview timeline and see synchronized audio + visuals
- I can export the lesson as a single `.avp` file (ZIP download)

### As an educator / student (Player)
- I can load an `.avp` file (drag & drop or URL) and see a poster image immediately
- I can play/pause/seek the audio like a normal media player
- Text and images appear/disappear at the correct timestamps
- Seeking updates visuals instantly (minimal drift)
- I can toggle visibility of the transcript (if present)
- The player enters/exits fullscreen cleanly (adapts to portrait/landscape)
- The component is reusable in other React apps (`<AVPPlayer src="..." />`)

## 5. In Scope (MVP)

- Basic keyframes: show / hide image or text
- Poster image shown before playback
- Transcript toggle (if file exists in zip)
- Provider abstraction layer (TTS + optional STT)
- Server proxy for API calls (keys in .env)
- Responsive player controls + fullscreen
- Simple error states & loading indicators
- Image compression hint / auto-downscale warning

## 6. Out of Scope (MVP – future phases)

- Complex animations / transitions (use pre-made GIF/Lottie/video instead)
- Multi-audio tracks / chapters
- User accounts, saving drafts, sharing links
- OS-level `.avp` file association
- Analytics / playback tracking
- Built-in video export fallback
- React Native player integration
- Subtitle styling customization

## 7. Success Criteria (MVP)

- Can create, export and play back a 5-minute lesson with 10–15 keyframes under 8 MB
- Player loads poster + manifest in <3 seconds on desktop (typical connection)
- Audio-visual sync drift < ±300 ms after seeks
- No API keys visible in browser dev tools
- Creator preview matches exported playback

## 8. Risks & Mitigations

- Browser zip performance → Use JSZip + Web Worker for extraction
- Audio-visual drift → RAF loop + binary search on sorted keyframes + user sync offset
- API quota exhaustion → Clear warnings + progress UI
- Large images bloating zip → Auto-compress / resolution limit in creator
