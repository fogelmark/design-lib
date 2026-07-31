'use client';

import { motion } from 'motion/react';
import { ComponentEntry } from '@/lib/component-registry';
import Link from 'next/link';

interface ComponentCardProps {
  component: ComponentEntry;
  index: number;
}

export default function ComponentCard({ component, index }: ComponentCardProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/component/${component.id}`}>
        <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
          {/* Preview container */}
          <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-zinc-900">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <component.component />
            </div>
          </div>

          {/* Card content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-accent-light transition-colors">
                {component.title}
              </h3>
              <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full whitespace-nowrap">
                {component.category}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">{component.description}</p>
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-500 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
