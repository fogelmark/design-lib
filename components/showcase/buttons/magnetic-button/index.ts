import { ComponentEntry } from '@/lib/component-registry';
import MagneticButton from './magnetic-button';

export const magneticButton: ComponentEntry = {
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
    <div className="flex items-center justify-center min-h-75">
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
};
