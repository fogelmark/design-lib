'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { components } from '@/lib/components';
import { notFound } from 'next/navigation';
import { use } from 'react';
import Header from '@/components/header';
import CodeBlock from '@/components/code-block';
import Link from 'next/link';

export default function ComponentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const component = components.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState<'tsx' | 'css'>('tsx');

  if (!component) {
    notFound();
  }

  const tabs = [
    { id: 'tsx' as const, label: 'Component' },
    ...(component.code.css ? [{ id: 'css' as const, label: 'Styles' }] : []),
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to components
        </Link>

        {/* Component header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {component.title}
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl">
                {component.description}
              </p>
            </div>
            <span className="px-3 py-1.5 bg-zinc-900 text-zinc-400 text-sm rounded-full">
              {component.category}
            </span>
          </div>

          {/* Tags and dependencies */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-900 text-zinc-500 text-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {component.dependencies.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600">Dependencies:</span>
                {component.dependencies.map((dep) => (
                  <code
                    key={dep}
                    className="px-2 py-1 bg-zinc-900 text-accent-light text-sm rounded font-mono"
                  >
                    {dep}
                  </code>
                ))}
              </div>
            )}
          </div>

          {component.usageNotes && (
            <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-400">
                <span className="text-zinc-300 font-medium">Note: </span>
                {component.usageNotes}
              </p>
            </div>
          )}
        </motion.div>

        {/* Live preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Live Preview</h2>
          <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            <div className="min-h-[400px] bg-zinc-950">
              <component.component />
            </div>
          </div>
        </motion.div>

        {/* Code section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Code</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            {activeTab === 'tsx' && (
              <CodeBlock
                code={component.code.tsx}
                language="tsx"
                title={`${component.id}.tsx`}
              />
            )}
            {activeTab === 'css' && component.code.css && (
              <CodeBlock
                code={component.code.css}
                language="css"
                title="styles.css"
              />
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
