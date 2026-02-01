// Manifest types
export interface Keyframe {
    time: number;
    type: 'show' | 'hide';
    target: string;
    content?: {
        src?: string;
        alt?: string;
    } | string;
}

export interface Manifest {
    version: string;
    title: string;
    duration?: number;
    audio: string;
    poster?: string;
    transcript?: string;
    keyframes?: Keyframe[];
}

// Player props and events
export interface AVPPlayerProps {
    src: string | File;
    onPlay?: () => void;
    onPause?: () => void;
    onTimeUpdate?: (time: number) => void;
    onEnded?: () => void;
    onError?: (error: Error) => void;
}

// Extracted AVP content
export interface AVPContent {
    manifest: Manifest;
    audio: Blob;
    poster?: Blob;
    images: Map<string, Blob>;
    transcript?: string;
}
