"use client"

import { cn } from "@/lib/utils"
import { leaguegothic } from "@/lib/fonts"

const letters = "ferra studio".split("")

export default function TextSequenceDemo() {
  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center text-[5vw] uppercase bg-red-primary",
        leaguegothic.className,
      )}
    >
      {letters.map((letter, i) => (
        <div key={i} className="text-black">
          {letter === " " ? "\u00A0" : letter}
        </div>
      ))}
    </div>
  )
}
