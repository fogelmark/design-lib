import { ComponentEntry } from '@/lib/component-registry';
import FullscreenPreloader from './fullscreen-preloader';

export const fullscreenPreloader: ComponentEntry = {
  id: 'fullscreen-preloader',
  title: 'Fullscreen Preloader',
  description: 'A fullscreen loading animation with progress counter and smooth exit',
  category: 'preloaders',
  tags: ['loading', 'animation', 'transition'],
  dependencies: ['motion'],
  usageNotes: 'Use AnimatePresence to control mount/unmount. Customize exit animation timing.',
  component: FullscreenPreloader,
  code: {
    tsx: `'use client';

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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
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
                style={{ width: \`\${progress}%\` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
  },
};
