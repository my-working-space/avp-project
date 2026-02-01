import { TTSProvider, TTSOptions } from '../../../shared/types/providers';

/**
 * Google Cloud Text-to-Speech Provider
 * Requires GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_TTS_API_KEY in .env
 */
export class GoogleTTSProvider implements TTSProvider {
  name = 'google';
  private projectId: string;
  private apiKey: string;

  constructor(projectId: string, apiKey: string) {
    if (!projectId || !apiKey) {
      throw new Error('GoogleTTSProvider requires GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_TTS_API_KEY');
    }
    this.projectId = projectId;
    this.apiKey = apiKey;
  }

  async generateSpeech(text: string, options: TTSOptions = {}): Promise<Blob> {
    const { language = 'en-US', voice = 'en-US-Neural2-C', speed = 1.0 } = options;

    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`;

    const requestBody = {
      input: { text },
      voice: {
        languageCode: language,
        name: voice,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: speed,
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Decode base64 audio content
      const audioContent = data.audioContent;
      if (!audioContent) {
        throw new Error('No audio content in response');
      }

      const binaryString = atob(audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new Blob([bytes], { type: 'audio/mpeg' });
    } catch (error) {
      console.error('GoogleTTSProvider error:', error);
      throw error;
    }
  }
}
