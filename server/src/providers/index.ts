import { TTSProvider } from '../../../shared/types/providers';
import { GoogleTTSProvider } from './tts/GoogleTTSProvider';

export interface ProvidersConfig {
    tts?: TTSProvider;
}

/**
 * Initialize TTS provider based on environment configuration
 */
export function initializeTTSProvider(
    googleProjectId?: string,
    googleApiKey?: string
): TTSProvider | null {
    if (googleProjectId && googleApiKey) {
        return new GoogleTTSProvider(googleProjectId, googleApiKey);
    }
    return null;
}

export { GoogleTTSProvider };
