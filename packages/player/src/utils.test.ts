import { describe, it, expect } from 'vitest';
import { extractAVP } from './utils';

describe('extractAVP', () => {
    it('should throw error on invalid AVP', async () => {
        const invalidFile = new File(['invalid'], 'test.avp');
        try {
            await extractAVP(invalidFile);
            expect.fail('Should have thrown error');
        } catch (err) {
            const msg = (err as Error).message;
            // Accept either our explicit Invalid AVP message or common unzip/zip errors
            expect(msg).toSatisfy((m: string) =>
                m.includes('Invalid AVP') ||
                m.includes("Can't read the data") ||
                m.includes("Can't find end of central directory") ||
                m.includes('Invalid')
            );
        }
    });
});
