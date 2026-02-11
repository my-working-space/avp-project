import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from './config.js';
import { initializeTTSProvider } from './providers/index.js';
import { createTTSRoute } from './routes/tts.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/config', (_req: Request, res: Response) => {
    // Return non-sensitive config info
    res.json({
        port: config.port,
        hasGoogleCloud: !!config.googleCloudProjectId,
        hasOpenAI: !!config.openaiApiKey,
        hasElevenLabs: !!config.elevenLabsApiKey,
    });
});

// Initialize TTS provider and mount routes
const ttsProvider = initializeTTSProvider(config.googleCloudProjectId, config.googleCloudKeyFile);

if (ttsProvider) {
    const ttsRoute = createTTSRoute({ provider: ttsProvider });
    app.use('/api', ttsRoute);
} else {
    // Fallback if no TTS provider configured
    app.post('/api/tts', (_req: Request, res: Response) => {
        res.status(503).json({ error: 'TTS provider not configured. Set GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_KEY_FILE in .env' });
    });
}

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
const port = config.port;
app.listen(port, () => {
    console.log(`✓ AVP Server running on http://localhost:${port}`);
    console.log(`✓ Health check: http://localhost:${port}/health`);
});

export default app;
