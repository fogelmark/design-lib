'use client';

import { motion } from 'motion/react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-zinc-800 bg-black/50 backdrop-blur-lg sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Design Library</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            by <span className="text-zinc-400">Alexander Fogelmark</span>
          </p>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
