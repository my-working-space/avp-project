/**
 * TTS Provider interface for pluggable text-to-speech services
 */
export interface TTSProvider {
    name: string;
    generateSpeech(text: string, options: TTSOptions): Promise<Blob>;
}

export interface TTSOptions {
    language?: string;
    voice?: string;
    speed?: number;
}

/**
 * STT Provider interface for future speech-to-text services
 */
export interface STTProvider {
    name: string;
    transcribe(audio: Blob): Promise<string>;
}
