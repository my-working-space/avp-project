import { TTSProvider } from '../../../shared/types/providers.js';
import { GoogleTTSProvider } from './tts/GoogleTTSProvider.js';

export interface ProvidersConfig {
    tts?: TTSProvider;
}

/**
 * Initialize TTS provider based on environment configuration
 * Expects GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_KEY_FILE in env
 */
export function initializeTTSProvider(
    googleProjectId?: string,
    googleKeyFile?: string
): TTSProvider | null {
    if (googleProjectId && googleKeyFile) {
        try {
            return new GoogleTTSProvider(googleProjectId, googleKeyFile);
        } catch (error) {
            console.error('Failed to initialize Google TTS Provider:', error);
            return null;
        }
    }
    return null;
}

export { GoogleTTSProvider };
