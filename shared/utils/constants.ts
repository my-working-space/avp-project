/**
 * Shared constants across the AVP tool
 */

export const APP_NAME = 'AVP Creator';
export const APP_VERSION = '0.1.0';

export const CONSTRAINTS = {
    MAX_FILE_SIZE_MB: 10,
    MAX_LESSON_DURATION_MINUTES: 10,
    MAX_KEYFRAMES: 50,
    WARN_FILE_SIZE_MB: 8,
};

export const PROVIDERS = {
    TTS: ['google', 'openai', 'elevenlabs'],
    STT: ['google', 'openai'],
};
