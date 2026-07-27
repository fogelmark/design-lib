import { ComponentEntry } from "@/lib/component-registry"
import TextSequence from "./text-sequence"

export const textSequence: ComponentEntry = {
  id: "text-sequence",
  title: "Text Sequence",
  description:
    "Animated text reveal with staggered slide-in effect and color transition",
  category: "text-animations",
  tags: ["animation", "text", "reveal", "stagger", "transition"],
  dependencies: ["motion"],
  usageNotes:
    "Animates when fully in view using useInView hook. Customize the text by changing the letters array. Adjust baseDuration and delay for different timing effects. Includes replay button. Uses custom font (League Gothic).",
  component: TextSequence,
  code: {
    tsx: `'use client'

import { cn } from "@/lib/utils"
import { leaguegothic } from "@/lib/fonts"
import { motion, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"
import type { Variants } from "motion/react"

const letters = "ferra studio".split("")

export default function TextSequence() {
  const [gray, setGray] = useState(false)
  const [key, setKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 1 })

  const baseDuration = 1.2
  const lastDelay = 0.05 * (letters.length - 1)
  const totalDuration = (baseDuration + lastDelay) * 1000

  useEffect(() => {
    if (isInView) {
      setGray(false)
      const t = setTimeout(() => setGray(true), totalDuration)
      return () => clearTimeout(t)
    }
  }, [isInView, totalDuration, key])

  const slideIn: Variants = {
    initial: (i: number) => ({
      x: letters[i] === "i" ? "200%" : "100%",
    }),
    animate: (i: number) => ({
      x: 0,
      transition: {
        duration: baseDuration,
        delay: 0.05 * i,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const handleReplay = () => {
    setGray(false)
    setKey((prev) => prev + 1)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full min-h-100 items-center justify-center text-[10vw] uppercase transition-colors duration-500",
        gray ? "bg-gray-background" : "bg-red-primary",
        leaguegothic.className,
      )}
    >
      {letters.map((letter, i) => {
        return (
          <div
            key={\`\${key}-\${i}\`}
            className={cn("overflow-hidden text-black", {
              "text-white": gray,
            })}
          >
            <motion.div
              className="will-change-transform"
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              custom={i}
              variants={slideIn}
            >
              {letter === " " ? "\\u00A0" : letter}
            </motion.div>
          </div>
        )
      })}
      {gray && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleReplay}
          className="absolute bottom-8 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Replay
        </motion.button>
      )}
    </div>
  )
}`,
  },
}
