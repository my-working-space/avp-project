# Phased Implementation Plan – AVP Tool

**Approach**: Iterative, visible progress first (player → creator → polish).  
CI/CD leverages GitHub Actions + Vercel (free tier sufficient for solo dev).  
Each milestone produces a deployable preview (Vercel) so you can test instantly.

## Milestone 0 – Setup & Boilerplate (1–2 days)
**Goal**: Working monorepo skeleton, first preview deployable  
**Visibility**: Basic landing page + player stub shows up online

- Initialize monorepo (npm workspaces)
- Set up `/apps/creator` (Vite + React + TS + Tailwind)
- Set up `/packages/player` (reusable component library)
- Set up `/server` (simple Express app for API proxy)
- Add `.env.example` + basic server `.env` loading
- GitHub repo → Actions: lint (ESLint + Prettier), typecheck (tsc --noEmit)
- Vercel project linked to repo → auto-deploys `/apps/creator` on every push/PR
- Basic landing page in creator app: "AVP Creator – Coming soon" + drag/drop zone stub

**CI/CD checks**:
- On PR/push: lint, format, typecheck
- On main merge: deploy preview + production (if tagged)

## Milestone 1 – Secure TTS Generation + Basic Audio Preview (2–4 days)
**Goal**: Text → audio working via server proxy  
**Visibility**: Type text → click Generate → hear audio in browser

- Define TTSProvider interface + GoogleTTSProvider impl (server-side)
- Create `/server/routes/tts.ts` → POST /api/tts (accepts text + options)
- Frontend form: textarea + provider select + Generate button
- Use fetch to call own `/api/tts` → play returned audio Blob
- Add simple loading spinner + error toast
- Vercel preview: test generation end-to-end (use your own Google key in Vercel env vars)

**CI/CD additions**:
- Add unit tests for provider interface (vitest)
- GitHub Actions: run tests on PR

## Milestone 2 – Minimal AVP Player Component (3–5 days)
**Goal**: Load dummy .avp → show poster → play audio  
**Visibility**: Drag/drop .avp file → see thumbnail + play button works

- Implement `<AVPPlayer src: string | File>` in `/packages/player`
- Use JSZip to extract manifest.json + poster + audio
- Show poster immediately (CSS background or <img>)
- Load audio Blob into `<audio preload="metadata">`
- Custom controls: play/pause, seek bar, current time / duration
- Basic events emitted (onPlay, onPause, onTimeUpdate)
- Test with manually created dummy .avp (zip audio.mp3 + manifest.json + thumbnail.jpg)
- Integrate player into creator app preview area

**CI/CD**:
- Add storybook (optional) or simple demo page in `/apps/creator`
- Vercel preview shows interactive player demo

## Milestone 3 – Keyframes, Sync & Transcript (4–7 days)
**Goal**: Full synchronized playback with text/images + transcript toggle  
**Visibility**: Player shows changing visuals during playback/seek

- Extend manifest schema parsing
- RAF-based sync loop: evaluate keyframes ≤ currentTime
- Render dynamic text & images (absolute positioned in flex container)
- Transcript parser (.srt → display with current line highlight)
- Toggle transcript visibility button
- Fullscreen API + responsive layout (media queries + orientation listener)
- Add user sync offset slider (±300 ms)

**CI/CD**:
- Manual test checklist in PR template
- Vercel preview: upload dummy .avp with keyframes → verify sync

## Milestone 4 – Creator Full Flow + Export (4–7 days)
**Goal**: Build complete lesson → export .avp  
**Visibility**: End-to-end: input → preview → download playable file

- Timeline scrubber + keyframe add/edit (at current preview time)
- Image upload → auto-compress (browser-image-compression)
- Support upload own audio + own transcript (.srt/text)
- Preview uses same `<AVPPlayer>` component
- Export: JSZip → add audio, images, manifest, transcript → generate Blob → download
- Size validation + warning if >8 MB

**CI/CD**:
- E2E smoke test (Playwright or Cypress) → upload, generate, export, reload & play

## Milestone 5 – Polish, Accessibility & Guardrails (3–6 days)
**Goal**: Production-ready MVP  
**Visibility**: Smooth UX, mobile friendly, no obvious bugs

- Accessibility: ARIA live for text changes, keyboard controls
- Error handling: invalid zip, missing audio, bad manifest
- Mobile: touch-friendly seek, prevent sleep during playback
- Loading states + progress bar for unzip/generation
- Basic docs: README + usage example for `<AVPPlayer />`
- Optional: PWA manifest (future React Native bridge)

**Final CI/CD**:
- Dependabot auto-updates
- Release workflow: tag → build → Vercel production deploy
```

### 2. Detailed Task Breakdown + Folder Structure

```markdown
# Detailed Task Breakdown & Folder Structure – AVP Tool

## Folder Structure (Recommended Monorepo)

```
avp-tool/
├── apps/
│   └── creator/                    # Main Vite + React app
│       ├── src/
│       │   ├── components/         # App-specific UI (Timeline, KeyframeEditor, etc.)
│       │   ├── pages/              # Home, Editor, Preview
│       │   ├── api/                # fetch wrappers (tts, stt)
│       │   ├── hooks/              # useAVPPreview, useTTS, etc.
│       │   ├── store/              # Zustand/Jotai atoms for lesson state
│       │   └── main.tsx
│       ├── public/
│       ├── vite.config.ts
│       └── index.html
├── packages/
│   └── player/                     # Reusable <AVPPlayer /> component
│       ├── src/
│       │   ├── AVPPlayer.tsx
│       │   ├── types.ts            # Manifest, Keyframe types
│       │   ├── utils/
│       │   │   ├── unzip.ts
│       │   │   └── syncEngine.ts   # RAF + keyframe evaluation
│       │   └── index.ts
│       ├── package.json            # "name": "@avp/player"
│       └── tsconfig.json
├── server/                         # Node/Express API proxy
│   ├── src/
│   │   ├── routes/
│   │   │   ├── tts.ts
│   │   │   └── stt.ts            # future
│   │   ├── providers/
│   │   │   ├── tts/
│   │   │   │   └── GoogleTTSProvider.ts
│   │   │   └── index.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── tsconfig.json
│   └── .env.example
├── shared/                         # Shared types & utils (symlinked or published)
│   ├── types/
│   │   ├── manifest.ts
│   │   └── providers.ts           # TTSProvider, STTProvider interfaces
│   └── utils/
│       └── constants.ts
├── .github/
│   └── workflows/
│       ├── ci.yml                 # lint, test, typecheck
│       └── deploy.yml             # Vercel preview/production
├── .env.example
├── package.json                   # "workspaces": ["apps/*", "packages/*"]
├── tsconfig.base.json
└── README.md
```

## Key Libraries (add via npm)

- **Frontend (Vite + React)**  
  react, react-dom, typescript, vite, @vitejs/plugin-react  
  tailwindcss, postcss, autoprefixer  
  jszip (zip handling)  
  file-saver (export download)  
  browser-image-compression (optional image optimize)  
  zustand or jotai (state management)  
  react-hot-toast (notifications)  
  lucide-react (icons)

- **Player-specific**  
  Howler.js or native <audio> + custom controls  
  (avoid full video.js/mediaelement — overkill)

- **Server (Express)**  
  express, cors, dotenv, @google-cloud/text-to-speech  
  (add openai, elevenlabs later)

- **Dev & Quality**  
  eslint, prettier, vitest, @testing-library/react  
  typescript, ts-node (for server)  
  playwright (optional e2e)
