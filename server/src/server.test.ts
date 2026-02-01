import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './server';

describe('Server', () => {
    it('should return health status', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
    });

    it('should return API config', async () => {
        const response = await request(app).get('/api/config');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('port');
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown');
        expect(response.status).toBe(404);
    });
});
