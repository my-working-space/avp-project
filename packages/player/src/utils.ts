import JSZip from 'jszip';
import { Manifest, AVPContent } from './types';

/**
 * Extract and parse an AVP file (ZIP archive)
 */
export async function extractAVP(file: File): Promise<AVPContent> {
    const zip = new JSZip();
    const loaded = await zip.loadAsync(file);

    // Load manifest
    const manifestFile = loaded.file('manifest.json');
    if (!manifestFile) {
        throw new Error('Invalid AVP: missing manifest.json');
    }

    const manifestText = await manifestFile.async('text');
    const manifest: Manifest = JSON.parse(manifestText);

    // Load audio
    const audioFile = loaded.file(manifest.audio);
    if (!audioFile) {
        throw new Error(`Invalid AVP: missing audio file ${manifest.audio}`);
    }
    const audio = await audioFile.async('blob');

    // Load poster if present
    let poster: Blob | undefined;
    if (manifest.poster) {
        const posterFile = loaded.file(manifest.poster);
        if (posterFile) {
            poster = await posterFile.async('blob');
        }
    }

    // Load transcript if present
    let transcript: string | undefined;
    if (manifest.transcript) {
        const transcriptFile = loaded.file(manifest.transcript);
        if (transcriptFile) {
            transcript = await transcriptFile.async('text');
        }
    }

    // Load images referenced in keyframes
    const images = new Map<string, Blob>();
    if (manifest.keyframes) {
        for (const keyframe of manifest.keyframes) {
            if (keyframe.type === 'show' && keyframe.content && typeof keyframe.content === 'object' && 'src' in keyframe.content) {
                const imgSrc = keyframe.content.src;
                if (imgSrc && !images.has(imgSrc)) {
                    const imgFile = loaded.file(imgSrc);
                    if (imgFile) {
                        const blob = await imgFile.async('blob');
                        images.set(imgSrc, blob);
                    }
                }
            }
        }
    }

    return {
        manifest,
        audio,
        poster,
        images,
        transcript,
    };
}
