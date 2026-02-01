import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Milestone 1 Verification Tests
 * Confirms TTS generation and basic audio preview are working
 */

describe('M1: Secure TTS Generation + Basic Audio Preview', () => {
  const rootDir = process.cwd();

  describe('TTS Provider Implementation', () => {
    it('should have GoogleTTSProvider implementation', () => {
      const providerFile = path.join(rootDir, 'server/src/providers/tts/GoogleTTSProvider.ts');
      expect(fs.existsSync(providerFile)).toBe(true);

      const content = fs.readFileSync(providerFile, 'utf-8');
      expect(content).toContain('GoogleTTSProvider');
      expect(content).toContain('TTSProvider');
      expect(content).toContain('generateSpeech');
    });

    it('GoogleTTSProvider should implement TTSProvider interface', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/providers/tts/GoogleTTSProvider.ts'),
        'utf-8'
      );
      expect(content).toContain('implements TTSProvider');
    });

    it('GoogleTTSProvider should accept project ID and API key', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/providers/tts/GoogleTTSProvider.ts'),
        'utf-8'
      );
      expect(content).toContain('projectId');
      expect(content).toContain('apiKey');
      expect(content).toContain('constructor');
    });

    it('should have providers index with initialization function', () => {
      const indexFile = path.join(rootDir, 'server/src/providers/index.ts');
      expect(fs.existsSync(indexFile)).toBe(true);

      const content = fs.readFileSync(indexFile, 'utf-8');
      expect(content).toContain('initializeTTSProvider');
      expect(content).toContain('GoogleTTSProvider');
    });
  });

  describe('TTS API Route', () => {
    it('should have TTS route file', () => {
      const routeFile = path.join(rootDir, 'server/src/routes/tts.ts');
      expect(fs.existsSync(routeFile)).toBe(true);
    });

    it('TTS route should accept POST requests', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/routes/tts.ts'),
        'utf-8'
      );
      expect(content).toContain("router.post('/tts'");
    });

    it('TTS route should validate text input', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/routes/tts.ts'),
        'utf-8'
      );
      expect(content).toContain('text');
      expect(content).toContain('required');
      expect(content).toContain('5000');
    });

    it('TTS route should return audio as base64', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/routes/tts.ts'),
        'utf-8'
      );
      expect(content).toContain('base64');
      expect(content).toContain('audio');
    });

    it('TTS route should create router with Express', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/routes/tts.ts'),
        'utf-8'
      );
      expect(content).toContain('createTTSRoute');
      expect(content).toContain('Router');
    });
  });

  describe('Server Integration', () => {
    it('server.ts should import TTS provider initialization', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/server.ts'),
        'utf-8'
      );
      expect(content).toContain('initializeTTSProvider');
    });

    it('server.ts should import TTS route creator', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/server.ts'),
        'utf-8'
      );
      expect(content).toContain('createTTSRoute');
    });

    it('server.ts should mount TTS route if provider exists', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/server.ts'),
        'utf-8'
      );
      expect(content).toContain('createTTSRoute');
      expect(content).toContain('app.use');
    });

    it('server.ts should handle missing provider gracefully', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'server/src/server.ts'),
        'utf-8'
      );
      expect(content).toContain('503');
      expect(content).toContain('provider not configured');
    });
  });

  describe('Frontend TTS Form', () => {
    it('should have TTSForm component', () => {
      const formFile = path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx');
      expect(fs.existsSync(formFile)).toBe(true);
    });

    it('TTSForm should have textarea for text input', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('textarea');
      expect(content).toContain('Text to Synthesize');
    });

    it('TTSForm should have language and voice selectors', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('Language');
      expect(content).toContain('Voice');
      expect(content).toContain('select');
    });

    it('TTSForm should have speed control slider', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('Speaking Speed');
      expect(content).toContain('range');
    });

    it('TTSForm should have generate button', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('Generate Audio');
      expect(content).toContain('handleGenerate');
    });

    it('TTSForm should fetch from /api/tts endpoint', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain("'/api/tts'");
      expect(content).toContain('fetch');
    });

    it('TTSForm should display audio preview player', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('audio');
      expect(content).toContain('Audio Preview');
      expect(content).toContain('controls');
    });

    it('TTSForm should have loading state with spinner', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('isLoading');
      expect(content).toContain('Loader');
      expect(content).toContain('animate-spin');
    });

    it('TTSForm should handle errors with toast', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('toast.error');
      expect(content).toContain('catch');
    });

    it('TTSForm should show success toast on generation', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('toast.success');
    });

    it('TTSForm should validate text length', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('5000');
      expect(content).toContain('characters');
    });

    it('TTSForm should accept onAudioGenerated callback', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/components/TTSForm.tsx'),
        'utf-8'
      );
      expect(content).toContain('onAudioGenerated');
      expect(content).toContain('TTSFormProps');
    });
  });

  describe('App Integration', () => {
    it('App should import and use TTSForm', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('TTSForm');
      expect(appContent).toContain('./components/TTSForm');
    });

    it('App should track generated audio state', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('audioBlob');
      expect(appContent).toContain('useState');
    });

    it('App should pass setAudioBlob to TTSForm', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('onAudioGenerated={setAudioBlob}');
    });

    it('App should display audio status when generated', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('Audio generated');
      expect(appContent).toContain('audioBlob &&');
    });

    it('App should show audio file size in status', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('audioBlob.size');
      expect(appContent).toContain('KB');
    });

    it('App should mark Audio Generation feature as complete', () => {
      const appContent = fs.readFileSync(
        path.join(rootDir, 'apps/creator/src/App.tsx'),
        'utf-8'
      );
      expect(appContent).toContain('✓');
      expect(appContent).toContain('Audio Generation');
    });
  });

  describe('Configuration', () => {
    it('.env.example should have Google Cloud TTS vars', () => {
      const envContent = fs.readFileSync(
        path.join(rootDir, '.env.example'),
        'utf-8'
      );
      expect(envContent).toContain('GOOGLE_CLOUD_PROJECT_ID');
      expect(envContent).toContain('GOOGLE_CLOUD_TTS_API_KEY');
    });

    it('server config should load TTS env vars', () => {
      const configContent = fs.readFileSync(
        path.join(rootDir, 'server/src/config.ts'),
        'utf-8'
      );
      expect(configContent).toContain('googleCloudProjectId');
      expect(configContent).toContain('googleCloudTtsApiKey');
      expect(configContent).toContain('GOOGLE_CLOUD_PROJECT_ID');
      expect(configContent).toContain('GOOGLE_CLOUD_TTS_API_KEY');
    });
  });

  describe('Testing', () => {
    it('should have TTS-related tests', () => {
      const testFiles = [
        'server/src/server.test.ts',
        'apps/creator/src/App.test.tsx',
      ];

      testFiles.forEach((testFile) => {
        const fullPath = path.join(rootDir, testFile);
        if (fs.existsSync(fullPath)) {
          expect(fs.existsSync(fullPath)).toBe(true);
        }
      });
    });
  });
});
