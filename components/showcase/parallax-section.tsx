'use client';

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
    <div ref={containerRef} className="relative min-h-125 bg-zinc-950 overflow-hidden">
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
}
