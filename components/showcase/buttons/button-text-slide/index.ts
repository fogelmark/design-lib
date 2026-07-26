import { ComponentEntry } from '@/lib/component-registry';
import ButtonTextSlideDemo from './button-text-slide-demo';

export const buttonTextSlide: ComponentEntry = {
  id: 'button-text-slide',
  title: 'Button Text Slide',
  description: 'An animated pill button with sliding text and background reveal on hover',
  category: 'buttons',
  tags: ['interactive', 'hover', 'animation', 'text-slide'],
  dependencies: ['motion'],
  usageNotes: 'This is a reusable component split into two files: the component itself and a demo wrapper. Customize colors and timing for different styles. Works best with short text labels.',
  component: ButtonTextSlideDemo,
  code: {
    tsx: `// ========================================
// FILE 1: button-text-slide.tsx - Reusable Component
// ========================================
// This is the main reusable component that you can use throughout your app.
// Copy this file to your components directory.

'use client';

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useState } from "react"

interface ButtonProps {
  children: string      // The text to display on the button
  className?: string    // Optional: Add custom Tailwind classes to override styles
}

export const ButtonTextSlide = ({ children, className }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={cn(
        "group relative flex min-w-48 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#d9d7cb] px-12 py-4 text-xs font-semibold uppercase [clip-path:inset(0px)]",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-20 leading-none [clip-path:inset(0px)]">
        <motion.span
          className="relative inline-block text-[#211e1f]"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isHovered ? "-100%" : 0,
            opacity: isHovered ? 0.25 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1],
            delay: isHovered ? 0 : 0.2,
          }}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 text-[#211e1f]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: isHovered ? 0 : "100%", opacity: isHovered ? 1 : 0 }}
          transition={{
            duration: 0.3,
            delay: isHovered ? 0.2 : 0,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {children}
        </motion.span>
      </span>
      <motion.span
        initial={{ y: "135%" }}
        animate={{
          y: isHovered ? 0 : "135%",
        }}
        transition={{
          duration: 0.8,
          delay: isHovered ? 0 : 0.1,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="pointer-events-none absolute top-0 z-0 h-full w-full rounded-2xl bg-[#eae9e3]"
      />
      <span className="absolute top-0 left-0 h-full w-full" />
    </span>
  )
}

// ========================================
// FILE 2: button-text-slide-demo.tsx - Usage Example
// ========================================
// This demonstrates how to use the ButtonTextSlide component.
// You can copy this pattern into your own pages/components.

'use client';

import React from 'react'
import { ButtonTextSlide } from './button-text-slide'

export default function ButtonTextSlideDemo() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      {/* BASIC USAGE: Simply pass the text you want as children */}
      <ButtonTextSlide>
        hover me
      </ButtonTextSlide>
    </div>
  )
}`,
  },
};
