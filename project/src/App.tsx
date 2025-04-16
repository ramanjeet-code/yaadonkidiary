import React, { useState, useCallback } from 'react';
import { PenTool, Loader2, Copy, Share2, RefreshCw } from 'lucide-react';
import shayariData from './data/shayaris.json';
import { findCategory } from './data/categories';

function App() {
  const [input, setInput] = useState('');
  const [shayari, setShayari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastCategory, setLastCategory] = useState<string | null>(null);

  const generateShayari = useCallback(async () => {
    if (!input.trim()) {
      setError('please choose other world ,Ex-love.Sad,pyaar,dard')

    try {
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const category = findCategory(input);
      
      if (!category) {
        setError('माफ़ करें, इस विषय पर शायरी उपलब्ध नहीं है\n Sorry poetry is not avaliable on this subbject ,please choose other one');
        return;
      }

      const shayaris = shayariData[category];
      const randomIndex = Math.floor(Math.random() * shayaris.length);
      setShayari(shayaris[randomIndex]);
      setLastCategory(category);
    } catch (err) {
      setError('Something went wrong ,please try again');
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const getNewShayari = useCallback(async () => {
    if (lastCategory) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const shayaris = shayariData[lastCategory];
      const randomIndex = Math.floor(Math.random() * shayaris.length);
      setShayari(shayaris[randomIndex]);
      setIsLoading(false);
    }
  }, [lastCategory]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shayari);
      alert('शायरी कॉपी हो गई है!');
    } catch (err) {
      alert('कॉपी करने में समस्या हुई');
    }
  };

  const shareShayari = async () => {
    try {
      await navigator.share({
        text: shayari,
        title: 'शायरी शेयर करें',
      });
    } catch (err) {
      // Ignore share errors
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <PenTool className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">शायरी जनरेटर</h1>
          </div>
          <p className="text-gray-600">put word in hindi ,english,tamil,telgu,japanese,chinese,kannad</p>
        </div>
             <div>
               Welocome to Yaado ki shayari
             </div>
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
             Hi you can enter world in Japanese,Hindi,English,HiEnglish,Tamil,Telgu,Kannad
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="जैसे: love, प्यार, दोस्ती, life, खुशी..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={generateShayari}
              disabled={isLoading}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>शायरी ढूंढ रहे हैं...</span>
                </>
              ) : (
                <span>शायरी दिखाएं</span>
              )}
            </button>
            {shayari && (
              <button
                onClick={getNewShayari}
                disabled={isLoading}
                className="bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="नई शायरी"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          {shayari && (
            <div className="mt-6 space-y-4">
              <div className="bg-purple-50 rounded-lg p-6 font-hindi relative">
                <p className="text-lg text-gray-800 whitespace-pre-line">{shayari}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
                    title="कॉपी करें"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareShayari}
                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
                    title="शेयर करें"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;