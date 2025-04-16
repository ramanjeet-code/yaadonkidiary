import React, { useEffect, useState, useCallback } from "react";
import {
  PenTool,
  Loader2,
  Copy,
  Share2,
  RefreshCw,
  Heart,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import shayariData from "./data/shayaris.json";
import { findCategory } from "./data/categories";

export default function App() {
  const [input, setInput] = useState("");
  const [shayari, setShayari] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCategory, setLastCategory] = useState(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState("classic"); // classic, mirza, ghalib, modern

  const themes = {
    classic: {
      title: "क्लासिक शायरी",
      bgClass:
        "bg-[url('/images/क्लासिक-शायरी.png')] bg-cover bg-center bg-blend-overlay",
      overlayClass: "bg-amber-900/40",
      accentColor: "amber",
      textClass: "text-amber-800",
    },
    mirza: {
      title: "मिर्ज़ा ग़ालिब",
      bgClass:
        "bg-[url('/images/mirza.jpg')] bg-cover bg-center bg-blend-overlay",
      overlayClass: "bg-indigo-900/40",
      accentColor: "galibblue",
      textClass: "text-white",
    },
    ghalib: {
      title: "पारंपरिक शायरी",
      bgClass:
        "bg-[url('/images/Calligraphy-Texture.jpg')] bg-cover bg-center bg-blend-overlay",
      overlayClass: "bg-emerald-900/40",
      accentColor: "emerald",
      textClass: "text-emerald-800",
    },
    modern: {
      title: "आधुनिक शायरी",
      bgClass:
        "bg-[url('/images/lonely.jpg')] bg-cover bg-center bg-blend-overlay",
      overlayClass: "bg-purple-900/40",
      accentColor: "purple",
      textClass: "text-purple-800",
    },
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    console.log(currentTheme.textClass); // Log the text color class when the theme changes
  }, [theme]);

  const generateShayari = useCallback(async () => {
    if (!input.trim()) {
      setError("Please choose a valid word (e.g., love, dosti, sadness, etc.)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate loading for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      const category = findCategory(input);

      if (!category) {
        setError(
          "Sorry, no Shayari available for this category. Try another one."
        );
        return;
      }

      const shayaris = shayariData[category];
      const randomIndex = Math.floor(Math.random() * shayaris.length);
      setShayari(shayaris[randomIndex]);
      setLastCategory(category);
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const getNewShayari = useCallback(async () => {
    if (lastCategory) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const shayaris = shayariData[lastCategory];
      const randomIndex = Math.floor(Math.random() * shayaris.length);
      setShayari(shayaris[randomIndex]);
      setIsLoading(false);
    }
  }, [lastCategory]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shayari);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("शायरी क्लिपबोर्ड पर कॉपी की गई!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      toast.error("कॉपी करने में त्रुटि।", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const shareShayari = async () => {
    try {
      await navigator.share({
        text: shayari,
        title: "शायरी शेयर",
      });
    } catch (err) {
      // Ignore share errors
    }
  };

  const getButtonClasses = (color) => {
    const colorMap = {
      amber:
        "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700",
      emerald:
        "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      purple:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      galibblue:
        "bg-gradient-to-r from-indigo-900 to-yellow-400 hover:from-indigo-800 hover:to-yellow-500",
    };

    return `${colorMap[color]} text-white py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-hindi`;
  };

  const getCardGradient = (color) => {
    const gradientMap = {
      amber: "from-amber-50 to-orange-50 border-amber-100",
      indigo: "from-indigo-50 to-blue-50 border-indigo-100",
      emerald: "from-emerald-50 to-teal-50 border-emerald-100",
      purple: "from-purple-50 to-pink-50 border-purple-100",
    };

    return gradientMap[color];
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`min-h-screen ${currentTheme.bgClass} ${currentTheme.overlayClass} p-4 sm:p-8`}
      >
        {/* Decorative elements */}
        <div className="fixed top-0 left-0 w-full h-12 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="fixed bottom-0 right-0 w-full h-12 bg-gradient-to-l from-black/80 to-transparent"></div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Theme selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.keys(themes).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => setTheme(themeKey)}
                className={`px-3 py-1 rounded-full text-xs ${
                  theme === themeKey
                    ? `bg-white text-${themes[themeKey].accentColor}-700 font-bold shadow-md`
                    : "bg-black/30 text-white hover:bg-black/40"
                }`}
              >
                {themes[themeKey].title}
              </button>
            ))}
          </div>

          {/* Header with improved styling */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/90 p-4 rounded-full shadow-lg backdrop-blur-sm">
                <BookOpen className={`w-10 h-10 ${currentTheme.textClass}`} />
              </div>
            </div>
            <h1
              className={`text-4xl sm:text-5xl font-bold mb-2 font-hindi drop-shadow-lg ${currentTheme.textClass}`}
            >
              शायरी जनरेटर
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-hindi backdrop-blur-sm bg-black/20 inline-block px-4 py-2 rounded-lg">
              हिंदी, अंग्रेजी, तमिल, तेलुगु, कन्नड़ आदि में शब्द दर्ज करें और
              सुंदर शायरी प्राप्त करें।
            </p>
          </div>

          {/* Main card with improved shadows and animations */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/50">
            {/* Decorative header */}
            <div
              className={`h-3 bg-gradient-to-r from-${currentTheme.accentColor}-500 via-${currentTheme.accentColor}-400 to-${currentTheme.accentColor}-500`}
            />

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">
                  एक शब्द दर्ज करें (उदाहरण: love, दोस्ती, life, उदासी...)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setError("");
                    }}
                    placeholder="जैसे: love, प्यार, दोस्ती, life, प्रेमा, खुशी..."
                    className={`w-full px-4 py-3 border border-${currentTheme.accentColor}-200 rounded-lg focus:ring-2 focus:ring-${currentTheme.accentColor}-500 focus:border-${currentTheme.accentColor}-500 pl-10 font-hindi`}
                  />
                  <Heart
                    className={`absolute left-3 top-3 w-5 h-5 text-${currentTheme.accentColor}-400`}
                  />
                </div>

                <button
                  onClick={generateShayari}
                  disabled={isLoading}
                  className={`w-full ${getButtonClasses(
                    currentTheme.accentColor
                  )}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>शायरी ढूंढ रहे हैं...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>शायरी दिखाएं</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded font-hindi">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {shayari && (
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -left-2 -top-2 text-4xl text-gray-300 font-serif">
                      "
                    </div>
                    <div className="absolute -right-2 -bottom-2 text-4xl text-gray-300 font-serif">
                      "
                    </div>

                    <div
                      className={`bg-gradient-to-br ${getCardGradient(
                        currentTheme.accentColor
                      )} rounded-lg p-8 font-hindi relative border shadow-inner`}
                    >
                      {/* Decorative ink splatter */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-black/5 blur-xl"></div>

                      <p className="text-xl text-gray-800 whitespace-pre-line leading-relaxed relative z-10">
                        {shayari}
                      </p>

                      {/* Attribution line with decorative separator */}
                      <div className="mt-4 flex items-center">
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      </div>

                      {/* Action buttons with improved styling */}
                      <div className="mt-6 flex justify-between items-center pt-4">
                        <button
                          onClick={getNewShayari}
                          disabled={!lastCategory || isLoading}
                          className={`flex items-center space-x-1 text-${currentTheme.accentColor}-600 hover:text-${currentTheme.accentColor}-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${
                              isLoading ? "animate-spin" : ""
                            }`}
                          />
                          <span className="text-sm">नई शायरी</span>
                        </button>

                        <div className="flex space-x-2">
                          <button
                            onClick={copyToClipboard}
                            className={`p-2 text-${currentTheme.accentColor}-600 hover:bg-${currentTheme.accentColor}-100 rounded-full transition-colors flex items-center space-x-1`}
                            title="Copy Shayari"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="text-xs">
                              {copied ? "कॉपी हो गया" : "कॉपी करें"}
                            </span>
                          </button>
                          <button
                            onClick={shareShayari}
                            className={`p-2 text-${currentTheme.accentColor}-600 hover:bg-${currentTheme.accentColor}-100 rounded-full transition-colors flex items-center space-x-1`}
                            title="Share Shayari"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">शेयर करें</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white/10 text-white text-base font-hindi backdrop-blur-md rounded-xl shadow-lg px-4 py-3 border border-white/20 text-center">
            यादों की शायरी का आनंद लें ❤️
          </div>
        </div>
      </div>
    </>
  );
}
