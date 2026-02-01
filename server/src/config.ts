import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface ServerConfig {
    port: number;
    googleCloudProjectId?: string;
    googleCloudTtsApiKey?: string;
    openaiApiKey?: string;
    elevenLabsApiKey?: string;
}

const config: ServerConfig = {
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
    googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    googleCloudTtsApiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
    elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
};

export default config;
