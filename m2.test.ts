import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Milestone 2 Verification Tests
 * Confirms AVP Player component works with basic file loading and playback
 */

describe('M2: Minimal AVP Player Component', () => {
    const rootDir = process.cwd();

    describe('AVP Player Component', () => {
        it('should have AVPPlayer component in packages/player', () => {
            const playerFile = path.join(rootDir, 'packages/player/src/AVPPlayer.tsx');
            expect(fs.existsSync(playerFile)).toBe(true);
        });

        it('AVPPlayer should accept src prop (string or File)', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('AVPPlayerProps');
            expect(content).toContain('src');
        });

        it('AVPPlayer should have loading state', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('isLoading');
            expect(content).toContain('Loading AVP file');
        });

        it('AVPPlayer should have error handling', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('error');
            expect(content).toContain('catch');
        });

        it('AVPPlayer should display poster image', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('poster');
            expect(content).toContain('<img');
        });

        it('AVPPlayer should have audio element', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('<audio');
            expect(content).toContain('audioRef');
        });

        it('AVPPlayer should have play/pause button', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('Play');
            expect(content).toContain('Pause');
        });

        it('AVPPlayer should have seek bar', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('range');
            expect(content).toContain('currentTime');
        });

        it('AVPPlayer should display current time and duration', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/AVPPlayer.tsx'),
                'utf-8'
            );
            expect(content).toContain('formatTime');
            expect(content).toContain('currentTime');
            expect(content).toContain('duration');
        });

        it('AVPPlayer should emit callback events', () => {
            const propsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/types.ts'),
                'utf-8'
            );
            expect(propsContent).toContain('onPlay');
            expect(propsContent).toContain('onPause');
            expect(propsContent).toContain('onTimeUpdate');
            expect(propsContent).toContain('onEnded');
        });
    });

    describe('AVP Extraction Utility', () => {
        it('should have extractAVP utility function', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('extractAVP');
        });

        it('extractAVP should load ZIP files with JSZip', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('JSZip');
            expect(utilsContent).toContain('loadAsync');
        });

        it('extractAVP should read manifest.json', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('manifest.json');
            expect(utilsContent).toContain('Manifest');
        });

        it('extractAVP should extract audio file', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('manifest.audio');
        });

        it('extractAVP should extract poster if present', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('manifest.poster');
        });

        it('extractAVP should extract transcript if present', () => {
            const utilsContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/utils.ts'),
                'utf-8'
            );
            expect(utilsContent).toContain('manifest.transcript');
        });

        it('extractAVP should return AVPContent with all assets', () => {
            const typesContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/types.ts'),
                'utf-8'
            );
            expect(typesContent).toContain('AVPContent');
            expect(typesContent).toContain('manifest');
            expect(typesContent).toContain('audio');
            expect(typesContent).toContain('poster');
            expect(typesContent).toContain('images');
            expect(typesContent).toContain('transcript');
        });
    });

    describe('Player Integration in Creator', () => {
        it('should have PlayerPreview component', () => {
            const previewFile = path.join(rootDir, 'apps/creator/src/components/PlayerPreview.tsx');
            expect(fs.existsSync(previewFile)).toBe(true);
        });

        it('PlayerPreview should import AVPPlayer', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/components/PlayerPreview.tsx'),
                'utf-8'
            );
            expect(content).toContain("import AVPPlayer from '@avp/player'");
        });

        it('PlayerPreview should have file upload input', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/components/PlayerPreview.tsx'),
                'utf-8'
            );
            expect(content).toContain('input');
            expect(content).toContain('accept=".avp"');
        });

        it('PlayerPreview should display AVPPlayer when file selected', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/components/PlayerPreview.tsx'),
                'utf-8'
            );
            expect(content).toContain('showPlayer');
            expect(content).toContain('selectedFile ? (');
        });

        it('PlayerPreview should have test file generator', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/components/PlayerPreview.tsx'),
                'utf-8'
            );
            expect(content).toContain('createTestAVP');
            expect(content).toContain('Load Test File');
        });

        it('App should import PlayerPreview component', () => {
            const appContent = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/App.tsx'),
                'utf-8'
            );
            expect(appContent).toContain('PlayerPreview');
            expect(appContent).toContain('./components/PlayerPreview');
        });

        it('App should render PlayerPreview', () => {
            const appContent = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/App.tsx'),
                'utf-8'
            );
            expect(appContent).toContain('<PlayerPreview');
        });
    });

    describe('Test AVP Generator', () => {
        it('should have test AVP generator utility', () => {
            const generatorFile = path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts');
            expect(fs.existsSync(generatorFile)).toBe(true);
        });

        it('createTestAVP should be exported', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('export');
            expect(content).toContain('createTestAVP');
        });

        it('createTestAVP should create manifest with keyframes', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('manifest');
            expect(content).toContain('keyframes');
        });

        it('createTestAVP should create ZIP archive', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('JSZip');
            expect(content).toContain('zip.file');
            expect(content).toContain('generateAsync');
        });

        it('createTestAVP should include audio file', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('audio.mp3');
        });

        it('createTestAVP should include poster image', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('poster.jpg');
        });

        it('createTestAVP should return File object', () => {
            const content = fs.readFileSync(
                path.join(rootDir, 'apps/creator/src/utils/testAVPGenerator.ts'),
                'utf-8'
            );
            expect(content).toContain('File');
            expect(content).toContain('.avp');
        });
    });

    describe('Package Exports', () => {
        it('player package should export AVPPlayer as default', () => {
            const indexContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/index.ts'),
                'utf-8'
            );
            expect(indexContent).toContain('export { AVPPlayer as default }');
        });

        it('player package should export types', () => {
            const indexContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/index.ts'),
                'utf-8'
            );
            expect(indexContent).toContain('AVPPlayerProps');
            expect(indexContent).toContain('Manifest');
            expect(indexContent).toContain('Keyframe');
        });

        it('player package.json should have proper exports configuration', () => {
            const packageJson = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'packages/player/package.json'), 'utf-8')
            );
            expect(packageJson.exports).toBeDefined();
            expect(packageJson.main).toBeDefined();
            expect(packageJson.types).toBeDefined();
        });
    });

    describe('TypeScript Configuration', () => {
        it('creator app should have path alias for @avp/player', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'apps/creator/tsconfig.json'), 'utf-8')
            );
            expect(tsconfig.compilerOptions.paths['@/*']).toBeDefined();
        });

        it('player package tsconfig should enable declaration files', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'packages/player/tsconfig.json'), 'utf-8')
            );
            expect(tsconfig.compilerOptions.declaration).toBe(true);
        });
    });
});
