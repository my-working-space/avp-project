import React, { useEffect, useRef, useState } from 'react';
import { AVPPlayerProps, AVPContent } from './types';
import { extractAVP } from './utils';

/**
 * AVPPlayer component - Renders and plays an AVP (Audio-Visual Package) file
 */
export const AVPPlayer: React.FC<AVPPlayerProps> = ({ src, onPlay, onPause, onTimeUpdate }) => {
  const [content, setContent] = useState<AVPContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const posterRef = useRef<string | null>(null);

  // Load AVP file
  useEffect(() => {
    const loadAVP = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const file = typeof src === 'string' ? await fetch(src).then((r) => r.blob()) : src;
        const file_: File = file instanceof File ? file : new File([file], 'avp-file.avp');
        const avpContent = await extractAVP(file_);

        setContent(avpContent);

        // Create poster URL
        if (avpContent.poster) {
          posterRef.current = URL.createObjectURL(avpContent.poster);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load AVP file');
      } finally {
        setIsLoading(false);
      }
    };

    loadAVP();
  }, [src]);

  // Set up audio
  useEffect(() => {
    if (content && audioRef.current) {
      const audioUrl = URL.createObjectURL(content.audio);
      audioRef.current.src = audioUrl;

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };

      const handleTimeUpdate = () => {
        const time = audioRef.current?.currentTime || 0;
        setCurrentTime(time);
        onTimeUpdate?.(time);
      };

      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
      };

      const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
      };

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);

      return () => {
        audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current?.removeEventListener('play', handlePlay);
        audioRef.current?.removeEventListener('pause', handlePause);
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [content, onPlay, onPause, onTimeUpdate]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading AVP file...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (!content) {
    return <div className="p-4 text-center">No content loaded</div>;
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-black text-white rounded-lg overflow-hidden">
      {/* Poster / Video Area */}
      <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
        {posterRef.current && (
          <img src={posterRef.current} alt="Poster" className="w-full h-full object-cover" />
        )}

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={() => audioRef.current?.play()}
            className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <span className="text-2xl text-black">▶</span>
          </button>
        )}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} />

      {/* Controls */}
      <div className="p-4 bg-gray-800">
        {/* Title */}
        <h3 className="text-lg font-bold mb-3">{content.manifest.title}</h3>

        {/* Seek Bar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
            className="flex-1 h-1 bg-gray-600 rounded cursor-pointer"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => (isPlaying ? audioRef.current?.pause() : audioRef.current?.play())}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AVPPlayer;
