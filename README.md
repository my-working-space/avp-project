# AVP Tool

Audio-Visual Package (AVP) Tool - Create and play interactive narrated lessons.

## Project Structure

```
avp-tool/
├── apps/
│   └── creator/          # Vite + React web app for creating lessons
├── packages/
│   └── player/           # Reusable React component library
├── server/               # Express API proxy for TTS and other services
├── shared/               # Shared types and utilities
└── .github/workflows/    # CI/CD pipelines
```

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development

#### Start Creator App

```bash
npm run dev
```

Opens http://localhost:5173

#### Start Server

```bash
cd server
npm run dev
```

Runs on http://localhost:3000

### Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Milestones

- **M0** ✓ Setup & Boilerplate (git, monorepo, landing page)
- **M1** Secure TTS Generation + Basic Audio Preview
- **M2** Minimal AVP Player Component
- **M3** Keyframes, Sync & Transcript
- **M4** Creator Full Flow + Export
- **M5** Polish, Accessibility & Guardrails

## API Documentation

### GET /health

Health check endpoint.

```bash
curl http://localhost:3000/health
```

### GET /api/config

Returns available TTS/STT providers.

```bash
curl http://localhost:3000/api/config
```

### POST /api/tts (Coming in M1)

Generate speech from text.

## Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm run test`
4. Run type-check: `npm run type-check`
5. Commit and push
