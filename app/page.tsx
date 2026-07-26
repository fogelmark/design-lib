'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { components } from '@/lib/components';
import { ComponentCategory } from '@/lib/component-registry';
import Header from '@/components/header';
import CategoryFilter from '@/components/category-filter';
import ComponentCard from '@/components/component-card';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');

  const filteredComponents = components.filter(
    (component) => selectedCategory === 'all' || component.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Production-ready
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">
              components & effects
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            A curated collection of UI components, animations, and interactions.
            Built with Next.js, TypeScript, and Framer Motion. Copy, paste, ship.
          </p>
        </motion.div>

        {/* Category filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Component grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component, index) => (
            <ComponentCard key={component.id} component={component} index={index} />
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">No components in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
