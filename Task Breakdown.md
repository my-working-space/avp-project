## Task Breakdown by Milestone (Detailed)

**Milestone 0**  
1. `npm init -y` + `npm install -D typescript tsconfig-paths`  
2. Create folders & configure `workspaces` in `package.json`  
3. Setup `/apps/creator` → `npm create vite@latest . -- --template react-ts`  
4. Setup `/server` → `npm init -y` + `npm install express dotenv`  
5. Add Vercel config (vercel.json + project link)  
6. Basic landing page + drag/drop stub in creator  
7. GitHub Actions: ci.yml (lint + typecheck)

**Milestone 1**  
8. Define `shared/types/providers.ts` → TTSProvider interface  
9. Implement GoogleTTSProvider in `/server`  
10. Add `/server/server.ts` → express app + /api/tts route  
11. In creator: TTS form component + fetch wrapper  
12. Play generated audio Blob in preview <audio>

**Milestone 2**  
13. Create `packages/player/src/types.ts` → Manifest, Keyframe  
14. Implement `AVPPlayer.tsx`: load src → JSZip load → extract poster/audio  
15. Render poster + custom controls  
16. Add to creator preview pane

**Milestone 3**  
17. Parse keyframes + transcript from manifest  
18. Create SyncEngine (RAF loop + currentTime → active elements)  
19. Render conditional text/images + transcript panel  
20. Fullscreen + responsive CSS

**Milestone 4**  
21. Timeline component + keyframe CRUD UI  
22. Image upload → compress → store Blob  
23. Export logic: JSZip → add files → download  
24. Integrate full flow in creator

**Milestone 5**  
25. Add accessibility attributes + keyboard handlers  
26. Error boundaries + user-friendly messages  
27. Mobile testing + touch events  
28. Final README + player usage example
