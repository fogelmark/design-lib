'use client';

import { useState } from 'react';
import { codeToHtml } from 'shiki';
import { useEffect } from 'react';
import { motion } from 'motion/react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    }).then(setHtml);
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-sm text-zinc-400 font-mono">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              ✓ Copied
            </motion.span>
          ) : (
            'Copy code'
          )}
        </button>
        <div
          className="overflow-x-auto text-sm [&>pre]:p-4 [&>pre]:bg-zinc-900 [&>pre]:rounded-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
