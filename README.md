# Tarun Varier - Portfolio

Personal portfolio site built with React, TypeScript, Vite, and Framer Motion.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for builds
- **Framer Motion** for animations
- **React Icons** for iconography
- Custom cursor, scroll-triggered animations, 3D tilt effects on project cards

## Project Structure

```
src/
├── components/
│   ├── AnimatedSection.tsx   # Reusable scroll-triggered animation wrapper
│   ├── CustomCursor.tsx      # Subtle dot + ring custom cursor
│   ├── Header.tsx            # Nav with active section indicator
│   ├── Hero.tsx              # Landing with letter-by-letter animation
│   ├── About.tsx             # Bio, skills by product lifecycle category
│   ├── Projects.tsx          # Project cards with 3D tilt effect
│   └── Contact.tsx           # Email, socials, availability status
├── hooks/
│   ├── useMousePosition.ts   # Mouse coordinate tracking
│   └── useScrollPosition.ts  # Scroll position + active section detection
├── utils/
│   └── animations.ts         # Framer Motion variants & spring presets
├── App.tsx
├── App.css                   # Global styles, CSS variables, theme
└── index.css                 # Base styles
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
