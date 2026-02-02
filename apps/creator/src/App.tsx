import { Toaster } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import { TTSForm } from './components/TTSForm';
import { PlayerPreview } from './components/PlayerPreview';
import './index.css';
import { useState } from 'react';

function App() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">AVP Creator</h1>
          <p className="text-xl text-gray-600">
            Create interactive narrated lessons packaged as a single file
          </p>
        </div>

        {/* TTS Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <TTSForm onAudioGenerated={setAudioBlob} />
        </div>

        {/* Player Preview */}
        <div className="max-w-2xl mx-auto mb-12">
          <PlayerPreview />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-block p-6 bg-blue-50 rounded-full">
                <Upload className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon</h2>
            <p className="text-gray-600 text-lg mb-8">
              You've generated audio! Next up: adding images, creating keyframes, and exporting your
              lesson as a single .avp file.
            </p>

            {/* Drag & Drop Stub */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <p className="text-gray-500 mb-2">Drag & drop your files here</p>
              <p className="text-sm text-gray-400">(Upload images and transcripts coming soon)</p>
            </div>

            {/* Feature Preview */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🎙️</div>
                <p className="font-semibold text-gray-800">Audio Generation</p>
                <p className="text-sm text-gray-600">✓ Generate narration from text</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🖼️</div>
                <p className="font-semibold text-gray-800">Media Control</p>
                <p className="text-sm text-gray-600">Add images and text at timestamps</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">📦</div>
                <p className="font-semibold text-gray-800">Export</p>
                <p className="text-sm text-gray-600">Download as a single .avp file</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      {audioBlob && (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <p className="font-semibold">
            ✓ Audio generated ({Math.round(audioBlob.size / 1024)} KB)
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
