'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FullscreenPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    setIsLoading(true);
    setProgress(0);
  };

  return (
    <div className="relative min-h-100 bg-zinc-900 overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white"
              >
                {Math.floor(progress)}%
              </motion.h2>
              <div className="w-48 h-0.5 bg-zinc-800 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            Replay
          </button>
        </motion.div>
      )}
    </div>
  );
}
