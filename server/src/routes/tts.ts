import { Router, Request, Response } from 'express';
import { TTSProvider, TTSOptions } from '../../../shared/types/providers';

export interface TTSRouteConfig {
  provider: TTSProvider;
}

export function createTTSRoute(config: TTSRouteConfig): Router {
  const router = Router();

  /**
   * POST /api/tts
   * Generate speech from text
   *
   * Body:
   *   - text: string (required) - Text to synthesize
   *   - language: string (optional) - Language code (default: en-US)
   *   - voice: string (optional) - Voice name (default: en-US-Neural2-C)
   *   - speed: number (optional) - Speaking rate (default: 1.0)
   */
  router.post('/tts', async (req: Request, res: Response) => {
    try {
      const { text, language, voice, speed } = req.body;

      // Validate input
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'text is required and must be a string' });
      }

      if (text.length > 5000) {
        return res.status(400).json({ error: 'text exceeds maximum length of 5000 characters' });
      }

      const options: TTSOptions = {
        language,
        voice,
        speed,
      };

      // Generate speech
      const audioBlob = await config.provider.generateSpeech(text, options);

      // Convert blob to base64 for transmission
      const buffer = await audioBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');

      res.json({
        success: true,
        audio: base64,
        mimeType: 'audio/mpeg',
      });
    } catch (error) {
      console.error('TTS error:', error);
      const message = error instanceof Error ? error.message : 'TTS generation failed';
      res.status(500).json({ error: message });
    }
  });

  return router;
}
