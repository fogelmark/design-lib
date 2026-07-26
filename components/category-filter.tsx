'use client';

import { motion } from 'motion/react';
import { ComponentCategory, CATEGORY_LABELS } from '@/lib/component-registry';

interface CategoryFilterProps {
  selectedCategory: ComponentCategory | 'all';
  onSelectCategory: (category: ComponentCategory | 'all') => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const categories: (ComponentCategory | 'all')[] = [
    'all',
    'buttons',
    'preloaders',
    'parallax',
    'page-transitions',
    'hover-effects',
    'text-animations',
    'cursors',
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap gap-2 mb-12"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                isSelected
                  ? 'bg-accent text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }
            `}
          >
            {category === 'all' ? 'All' : CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </motion.div>
  );
}
