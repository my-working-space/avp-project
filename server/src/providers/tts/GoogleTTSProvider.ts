import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TTSProvider, TTSOptions } from '../../../shared/types/providers.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Google Cloud Text-to-Speech Provider
 * Uses service account credentials (JSON keyfile) for authentication
 */
export class GoogleTTSProvider implements TTSProvider {
    name = 'google';
    private projectId: string;
    private client: TextToSpeechClient;

    constructor(projectId: string, keyFilePath: string) {
        if (!projectId || !keyFilePath) {
            throw new Error('GoogleTTSProvider requires projectId and keyFilePath to service account JSON');
        }

        // Verify keyfile exists
        if (!fs.existsSync(keyFilePath)) {
            throw new Error(`Service account keyfile not found: ${keyFilePath}`);
        }

        this.projectId = projectId;

        // Initialize Google Cloud TTS client with service account credentials
        this.client = new TextToSpeechClient({
            keyFilename: path.resolve(keyFilePath),
        });
    }

    async generateSpeech(text: string, options: TTSOptions = {}): Promise<Blob> {
        const { language = 'en-US', voice = 'en-US-Neural2-C', speed = 1.0 } = options;

        try {
            const request = {
                input: { text },
                voice: {
                    languageCode: language,
                    name: voice,
                },
                audioConfig: {
                    audioEncoding: 'MP3' as const,
                    speakingRate: speed,
                },
            };

            const [response] = await this.client.synthesizeSpeech(request);

            if (!response.audioContent) {
                throw new Error('No audio content in response');
            }

            // audioContent is already a Buffer or Uint8Array
            return new Blob([response.audioContent], { type: 'audio/mpeg' });
        } catch (error) {
            console.error('GoogleTTSProvider error:', error);
            throw error;
        }
    }
}
