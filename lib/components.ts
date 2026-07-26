import { ComponentEntry } from './component-registry';
import MagneticButton from '@/components/showcase/magnetic-button';
import FullscreenPreloader from '@/components/showcase/fullscreen-preloader';
import ParallaxSection from '@/components/showcase/parallax-section';
import TextRevealScroll from '@/components/showcase/text-reveal-scroll';

export const components: ComponentEntry[] = [
  {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    description: 'A button that follows the cursor with smooth spring physics',
    category: 'buttons',
    tags: ['interactive', 'hover', 'spring'],
    dependencies: ['motion'],
    usageNotes: 'Works best on desktop. Adjust spring config for different feels.',
    component: MagneticButton,
    code: {
      tsx: `'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
      >
        Magnetic Button
      </motion.button>
    </div>
  );
}`,
    },
  },
  {
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
  },
  {
    id: 'parallax-section',
    title: 'Parallax Section',
    description: 'Layered elements that move at different speeds on scroll',
    category: 'parallax',
    tags: ['scroll', 'depth', 'layers'],
    dependencies: ['motion'],
    usageNotes: 'Requires a scrollable parent. Adjust offset values for different scroll ranges.',
    component: ParallaxSection,
    code: {
      tsx: `'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="relative min-h-[500px] bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: y1 }}
          className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="relative z-10 text-center space-y-4"
        >
          <h2 className="text-5xl font-bold text-white">Parallax Effect</h2>
          <p className="text-zinc-400">Scroll to see the layers move at different speeds</p>
        </motion.div>
      </div>
    </div>
  );
}`,
    },
  },
  {
    id: 'text-reveal-scroll',
    title: 'Text Reveal on Scroll',
    description: 'Text that reveals word by word as you scroll',
    category: 'text-animations',
    tags: ['scroll', 'reveal', 'typography'],
    dependencies: ['motion'],
    usageNotes: 'Adjust offset values to control when the reveal starts and ends.',
    component: TextRevealScroll,
    code: {
      tsx: `'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function TextRevealScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = 'Scroll to reveal this text word by word'.split(' ');

  return (
    <div ref={containerRef} className="min-h-[400px] flex items-center justify-center bg-zinc-900">
      <p className="text-4xl md:text-6xl font-bold text-center px-8 max-w-4xl">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

          return (
            <motion.span
              key={index}
              style={{ opacity }}
              className="inline-block mr-3 text-white"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}`,
    },
  },
];
