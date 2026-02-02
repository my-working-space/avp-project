import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Volume2, Loader } from 'lucide-react';

interface TTSFormProps {
  onAudioGenerated?: (audioBlob: Blob) => void;
}

export function TTSForm({ onAudioGenerated }: TTSFormProps) {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('en-US-Neural2-C');
  const [speed, setSpeed] = useState('1.0');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const voices = {
    'en-US': [
      { value: 'en-US-Neural2-A', label: 'Neural2-A (Male)' },
      { value: 'en-US-Neural2-C', label: 'Neural2-C (Female)' },
      { value: 'en-US-Neural2-E', label: 'Neural2-E (Female)' },
      { value: 'en-US-Neural2-F', label: 'Neural2-F (Female)' },
    ],
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error('Please enter text to generate speech');
      return;
    }

    if (text.length > 5000) {
      toast.error('Text exceeds maximum length of 5000 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language,
          voice,
          speed: parseFloat(speed),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate speech');
      }

      const data = await response.json();

      // Decode base64 audio and create blob
      const binaryString = atob(data.audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });

      // Create audio URL for preview
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Notify parent if callback provided
      if (onAudioGenerated) {
        onAudioGenerated(audioBlob);
      }

      toast.success('Audio generated successfully!');
    } catch (error) {
      console.error('TTS error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };

  const currentVoices = voices[language as keyof typeof voices] || voices['en-US'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Volume2 className="w-6 h-6 text-blue-600" />
        Generate Audio Narration
      </h2>

      <form onSubmit={handleGenerate} className="space-y-4">
        {/* Text Input */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Text to Synthesize
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">{text.length} / 5000 characters</p>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                // Reset voice when language changes
                setVoice(
                  voices[e.target.value as keyof typeof voices]?.[0]?.value || 'en-US-Neural2-C'
                );
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="en-US">English (US)</option>
            </select>
          </div>

          {/* Voice Selection */}
          <div>
            <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-2">
              Voice
            </label>
            <select
              id="voice"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {currentVoices.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Speed Control */}
        <div>
          <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-2">
            Speaking Speed: {speed}x
          </label>
          <input
            id="speed"
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full"
            disabled={isLoading}
          />
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          {isLoading && <Loader className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Generating...' : 'Generate Audio'}
        </button>
      </form>

      {/* Audio Preview */}
      {audioUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Audio Preview</h3>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
