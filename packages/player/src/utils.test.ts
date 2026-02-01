import { describe, it, expect } from 'vitest';
import { extractAVP } from './utils';

describe('extractAVP', () => {
    it('should throw error on invalid AVP', async () => {
        const invalidFile = new File(['invalid'], 'test.avp');
        try {
            await extractAVP(invalidFile);
            expect.fail('Should have thrown error');
        } catch (err) {
            expect((err as Error).message).toContain('Invalid AVP');
        }
    });
});
