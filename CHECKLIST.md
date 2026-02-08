# 📋 AVP Tool – Remaining Tasks Checklist

**Status**: Milestones 0–2 Complete ✅ | **Current Phase**: Milestone 3

---

## ✅ Completed Milestones

### Milestone 0 – Setup & Boilerplate (70/70 tests)
- [x] Monorepo structure with npm workspaces configured
- [x] `/apps/creator` (Vite + React + TypeScript + Tailwind)
- [x] `/packages/player` (component library)
- [x] `/server` (Express API)
- [x] GitHub Actions CI/CD pipeline
- [x] Vercel deployment configured
- [x] Basic landing page + drag/drop zone stub
- [x] All configuration files (tsconfig, eslint, prettier)

### Milestone 1 – Secure TTS + Audio Preview (34/34 tests)
- [x] GoogleTTSProvider implementation
- [x] `/api/tts` endpoint on Express server
- [x] TTS Form component with language/voice/speed controls
- [x] Audio generation and preview working
- [x] Error handling with toast notifications
- [x] Server configuration loading with dotenv

### Milestone 2 – AVP Player Component (36/36 tests)
- [x] `AVPPlayer` component fully implemented
- [x] JSZip integration for extracting .avp files
- [x] Poster display + audio playback controls
- [x] Seek bar with current time/duration display
- [x] `extractAVP()` utility for manifest/audio/images
- [x] Test AVP file generator (`createTestAVP`)
- [x] Integration complete in creator app
- [x] PlayerPreview component for file uploads

---

## 🎬 Milestone 3 – Keyframes, Sync & Transcript

**Goal**: Full synchronized playback with text/images + transcript toggle  
**Visibility**: Player shows changing visuals during playback/seek  
**Estimated**: 4–7 days

### Core Implementation

- [ ] Parse keyframes from manifest schema
  - [ ] Define Keyframe type structure
  - [ ] Add keyframe validation logic
  - [ ] Update manifest parsing in `extractAVP()`
- [ ] Create SyncEngine with RAF loop
  - [ ] Implement RAF-based sync loop
  - [ ] Evaluate keyframes ≤ currentTime
  - [ ] Handle time-based element transitions
  - [ ] Add playback/seek synchronization
- [ ] Render dynamic content
  - [ ] Render dynamic text elements
  - [ ] Render dynamic images (absolute positioned)
  - [ ] Manage element lifecycle during sync
  - [ ] Update AVPPlayer component to use SyncEngine

### Transcript Support

- [ ] Transcript parser (.srt format)
  - [ ] Create parser utility for .srt files
  - [ ] Parse timestamps and text
  - [ ] Handle edge cases
- [ ] Transcript UI component
  - [ ] Create transcript panel display
  - [ ] Highlight current line during playback
  - [ ] Add toggle visibility button
  - [ ] Style for readability

### Layout & Responsiveness

- [ ] Fullscreen API integration
  - [ ] Add fullscreen button to controls
  - [ ] Handle fullscreen state
  - [ ] Apply fullscreen CSS
- [ ] Responsive design
  - [ ] Media queries for mobile/tablet
  - [ ] Flexbox/grid adjustments
  - [ ] Test orientation changes (landscape/portrait)
- [ ] User sync offset slider
  - [ ] Add ±300ms offset control
  - [ ] Persist offset preference
  - [ ] Apply offset to sync calculations

### Testing & Verification

- [ ] Create m3.test.ts verification suite
- [ ] Manual test checklist in PR template
- [ ] Vercel preview: upload dummy .avp with keyframes → verify sync

---

## 🎨 Milestone 4 – Creator Full Flow & Export

**Goal**: Build complete lesson → export .avp  
**Visibility**: End-to-end: input → preview → download playable file  
**Estimated**: 4–7 days

### Timeline & Keyframe Management

- [ ] Timeline scrubber component
  - [ ] Create timeline UI showing audio duration
  - [ ] Add current playback position indicator
  - [ ] Implement click-to-seek functionality
- [ ] Keyframe CRUD UI
  - [ ] Add keyframe at current preview time
  - [ ] Edit existing keyframe properties
  - [ ] Delete keyframe with confirmation
  - [ ] Reorder keyframes
  - [ ] Show keyframe timeline markers

### Media Management

- [ ] Image upload functionality
  - [ ] Create image upload input
  - [ ] Validate file types (jpg, png, webp)
  - [ ] Validate file sizes
- [ ] Image compression
  - [ ] Integrate browser-image-compression
  - [ ] Compress on upload
  - [ ] Show compression progress
  - [ ] Store compressed Blob
- [ ] Support custom audio upload
  - [ ] Audio file upload input
  - [ ] Validate audio format
  - [ ] Use as lesson audio
- [ ] Support custom transcript upload
  - [ ] .srt file upload
  - [ ] Text file upload
  - [ ] Parse and display

### Export Functionality

- [ ] Export workflow
  - [ ] Gather all assets (audio, images, keyframes)
  - [ ] Create manifest.json
  - [ ] JSZip integration
  - [ ] Package all files into .avp (zip)
  - [ ] Generate Blob
  - [ ] Trigger download
- [ ] Export validation
  - [ ] Check all required files present
  - [ ] Validate audio format
  - [ ] Calculate total file size
  - [ ] Warn if >8 MB
  - [ ] Show success notification

### Full Creator Integration

- [ ] Update App layout
  - [ ] Side panel: TTS form + keyframe editor
  - [ ] Center: timeline/keyframe manager
  - [ ] Right panel: preview (AVPPlayer)
  - [ ] Bottom: export controls
- [ ] State management
  - [ ] Track lesson metadata
  - [ ] Track all assets
  - [ ] Track keyframes
  - [ ] Save/load draft state (localStorage?)

### Testing & Verification

- [ ] Create m4.test.ts verification suite
- [ ] E2E smoke test (Playwright/Cypress)
  - [ ] Upload audio
  - [ ] Add keyframes
  - [ ] Generate export
  - [ ] Reload and play
- [ ] Vercel preview: test full flow

---

## ✨ Milestone 5 – Polish, Accessibility & Guardrails

**Goal**: Production-ready MVP  
**Visibility**: Smooth UX, mobile friendly, no obvious bugs  
**Estimated**: 3–6 days

### Accessibility

- [ ] ARIA attributes
  - [ ] Add ARIA labels to buttons/controls
  - [ ] Add ARIA live regions for status updates
  - [ ] Add ARIA descriptions for complex UI
- [ ] Keyboard navigation
  - [ ] Space: play/pause
  - [ ] Arrow keys: seek backward/forward
  - [ ] F: fullscreen toggle
  - [ ] M: mute/unmute
  - [ ] T: toggle transcript
- [ ] Screen reader support
  - [ ] Test with screen reader
  - [ ] Ensure all interactive elements are keyboard accessible
  - [ ] Announce important state changes

### Error Handling & Resilience

- [ ] Invalid .avp format handling
  - [ ] Detect missing manifest.json
  - [ ] Detect missing audio file
  - [ ] Show user-friendly error messages
- [ ] Bad manifest data handling
  - [ ] Validate manifest schema
  - [ ] Handle missing/corrupt keyframes
  - [ ] Graceful fallback behavior
- [ ] Error boundaries
  - [ ] Wrap player in error boundary
  - [ ] Wrap creator in error boundary
  - [ ] Show error UI with recovery options

### Mobile & Touch Support

- [ ] Touch-friendly UI
  - [ ] Larger touch targets (min 44px)
  - [ ] Remove hover-only interactions
  - [ ] Test on real mobile devices
- [ ] Mobile controls
  - [ ] Simplified control layout for small screens
  - [ ] Full-width player on mobile
  - [ ] Optimized font sizes
- [ ] Prevent sleep during playback
  - [ ] Request wake lock during playback
  - [ ] Release on pause/end
- [ ] Orientation handling
  - [ ] Detect orientation changes
  - [ ] Adjust layout accordingly
  - [ ] Maintain playback position on rotation

### Loading States & UX

- [ ] Loading indicators
  - [ ] Show spinner while unzipping .avp
  - [ ] Show progress bar for large files
  - [ ] Estimated time remaining
- [ ] Progress feedback
  - [ ] Image compression progress
  - [ ] Export progress
  - [ ] Network request status
- [ ] Success/error toasts
  - [ ] Confirm successful operations
  - [ ] Clear error messages
  - [ ] Auto-dismiss after delay

### Documentation & Examples

- [ ] Update README
  - [ ] Installation instructions
  - [ ] Usage examples
  - [ ] Component prop documentation
  - [ ] API endpoints documentation
- [ ] Create AVPPlayer usage example
  - [ ] Basic usage demo
  - [ ] Callbacks and events
  - [ ] Styling customization
  - [ ] Accessibility notes
- [ ] Add JSDoc comments
  - [ ] All exported functions
  - [ ] All React components
  - [ ] Type definitions

### Testing & Quality

- [ ] Create m5.test.ts verification suite
- [ ] Manual testing checklist
  - [ ] Test on Firefox, Chrome, Safari
  - [ ] Test on mobile browsers
  - [ ] Test keyboard navigation
  - [ ] Test with screen reader
- [ ] Accessibility audit
  - [ ] Run axe DevTools
  - [ ] Check WCAG 2.1 AA compliance
  - [ ] Fix any issues found

### Optional Enhancements

- [ ] PWA manifest setup
  - [ ] Progressive Web App metadata
  - [ ] Service worker foundation (for future)
  - [ ] Install prompt
- [ ] Dependabot integration
  - [ ] Enable automatic dependency updates
  - [ ] Review and merge P.R.s
- [ ] Release workflow
  - [ ] Git tag → build → Vercel production deploy
  - [ ] Version bumping strategy
  - [ ] Changelog generation

---

## 📊 Progress Summary

| Milestone | Status            | Tests | Notes                  |
| --------- | ----------------- | ----- | ---------------------- |
| M0        | ✅ Complete       | 70/70 | Setup & Boilerplate    |
| M1        | ✅ Complete       | 34/34 | TTS + Audio Preview    |
| M2        | ✅ Complete       | 36/36 | AVP Player Component   |
| M3        | 🚀 Ready to Start | —     | Keyframes & Sync       |
| M4        | ⏳ Planned        | —     | Creator Full Flow      |
| M5        | ⏳ Planned        | —     | Polish & Accessibility |

---

## 🎯 Quick Reference

### Commands

```bash
# Run all tests
npm test

# Run milestone verification tests
npx vitest run m0.test.ts
npx vitest run m1.test.ts
npx vitest run m2.test.ts

# Development
npm run dev              # Start creator app (localhost:5173)
cd server && npm run dev # Start server (localhost:3000)

# Type checking
npm run type-check
```

### Key Files to Reference

- **Manifest schema**: `packages/player/src/types.ts`
- **Player component**: `packages/player/src/AVPPlayer.tsx`
- **Creator app**: `apps/creator/src/App.tsx`
- **Server setup**: `server/src/server.ts`
- **Task breakdown**: `Task Breakdown.md`
- **Phased plan**: `Phased Plan.md`
