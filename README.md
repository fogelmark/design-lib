# Design Library

A personal design library showcasing production-ready UI components, animations, and effects built with Next.js, TypeScript, and Framer Motion.

## Overview

This is a portfolio site that demonstrates reusable UI components and interactions I've built throughout my work as a frontend engineer. Each component includes:

- **Live interactive preview** (isolated in iframe)
- **Complete source code** with syntax highlighting
- **Copy-paste ready** implementation
- **Usage notes** and dependencies

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (motion)
- **Shiki** (syntax highlighting)

## Project Structure

```
/app
  /component/[id]     # Component detail pages
  /preview/[id]       # Isolated preview iframes
  layout.tsx          # Root layout
  page.tsx            # Main component grid
  globals.css         # Global styles + design tokens

/components
  /showcase           # Live component implementations
    magnetic-button.tsx
    fullscreen-preloader.tsx
    parallax-section.tsx
    text-reveal-scroll.tsx
  header.tsx
  category-filter.tsx
  component-card.tsx
  code-block.tsx

/lib
  component-registry.ts  # TypeScript types
  components.ts          # Component registry (imports & code strings)
```

## Adding New Components

To add a new component to the library:

### 1. Create the component file

Create a new file in `/components/showcase/` using **kebab-case**:

```tsx
// components/showcase/your-component.tsx
'use client';

import { motion } from 'motion/react';

export default function YourComponent() {
  return (
    <div className="min-h-100 flex items-center justify-center">
      {/* Your component implementation */}
    </div>
  );
}
```

### 2. Add to the registry

Open `/lib/components.ts` and add your component:

```tsx
import YourComponent from '@/components/showcase/your-component';

export const components: ComponentEntry[] = [
  // ... existing components
  {
    id: 'your-component',
    title: 'Your Component',
    description: 'A brief description of what it does',
    category: 'buttons', // or 'preloaders', 'parallax', etc.
    tags: ['interactive', 'hover'],
    dependencies: ['motion'],
    usageNotes: 'Optional usage notes, e.g., "requires parent with position: relative"',
    component: YourComponent,
    code: {
      tsx: `'use client';

// Copy the full source code here as a string
// This is what users will see in the code view
`,
      css: `/* Optional: separate CSS if needed */`,
    },
  },
];
```

### 3. That's it!

The component will automatically appear in the grid and be available at `/component/your-component`.

## Design Decisions

### Component Isolation (iframes)
Each component preview renders in an isolated iframe to prevent style/script conflicts with the main site. This ensures that:
- Components can use conflicting CSS without affecting the library site
- Motion animations don't interfere with page-level transitions
- Preview is truly representative of standalone usage

### Data Structure
Components are defined in `/lib/components.ts` as a simple array. While the source code is duplicated as a string, this approach:
- Keeps everything in one place
- Enables static generation (no runtime file reading)
- Makes it trivial to add components (just add to the array)
- Avoids build-time complexity

For a larger library, consider:
- Reading component source at build time using Node.js fs
- Storing metadata in separate JSON files
- Using MDX for component docs

### Dark Mode Only
The site uses a dark-first design with purple accent (`#8b5cf6`) as the intentional brand color, avoiding generic Tailwind defaults.

### Typography
Uses Geist Sans and Geist Mono for a clean, professional aesthetic suitable for a developer portfolio.

## Running Locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Future Enhancements

Potential additions (not implemented in v1):

- Search functionality
- More component examples
- Interactive prop controls for components
- Theme switcher (light mode)
- Component usage stats/analytics
- Related components suggestions
- Video demos for complex animations
