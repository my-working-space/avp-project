import React, { useState } from 'react';
import AVPPlayer from '@avp/player';
import { FileUp, Zap } from 'lucide-react';
import { createTestAVP } from '../utils/testAVPGenerator';

export function PlayerPreview() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoadingTest, setIsLoadingTest] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowPlayer(true);
    }
  };

  const handleLoadTestFile = async () => {
    try {
      setIsLoadingTest(true);
      const testFile = await createTestAVP();
      setSelectedFile(testFile);
      setShowPlayer(true);
    } catch (error) {
      console.error('Failed to create test AVP:', error);
    } finally {
      setIsLoadingTest(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FileUp className="w-6 h-6 text-blue-600" />
        AVP Player Preview
      </h2>

      {!showPlayer ? (
        <div className="space-y-4">
          <div>
            <label className="inline-block cursor-pointer w-full">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="text-gray-600 font-medium mb-2">Load an AVP file to preview</p>
                <p className="text-sm text-gray-500">Click to select file</p>
              </div>
              <input type="file" accept=".avp" onChange={handleFileSelect} className="hidden" />
            </label>
            <p className="text-xs text-gray-500 mt-4">
              Supported: AVP files (ZIP archives with manifest.json)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLoadTestFile}
              disabled={isLoadingTest}
              className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-200 text-blue-800 font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {isLoadingTest ? 'Creating...' : 'Load Test File'}
            </button>
          </div>
        </div>
      ) : selectedFile ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-medium">File:</span> {selectedFile.name}
            </p>
            <button
              onClick={() => {
                setShowPlayer(false);
                setSelectedFile(null);
              }}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
            >
              Change File
            </button>
          </div>

          <div className="bg-black rounded-lg overflow-hidden">
            <AVPPlayer src={selectedFile} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
