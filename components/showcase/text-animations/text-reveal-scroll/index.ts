import { ComponentEntry } from '@/lib/component-registry';
import TextRevealScroll from './text-reveal-scroll';

export const textRevealScroll: ComponentEntry = {
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
    <div ref={containerRef} className="min-h-100 flex items-center justify-center bg-zinc-900">
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
};
