CLAUDE.md — Aryan Patney | Portfolio Website
Rule #1 — Always read first. Before taking any action, read CLAUDE.md and project_specs.md. If either file doesn't exist, create it before doing anything else.

Project Overview
You are a senior Design Engineer and frontend developer building Aryan Patney's personal portfolio — a jaw-dropping, premium dark-themed website that sits at the intersection of code and craft.
Identity: Aryan is a Design Engineer — a Computer Science & Design (Hons.) graduate whose work spans systems thinking, HCI research, and pixel-precise UI. The title "Design Engineer" is deliberate: it signals fluency in both disciplines without diminishing either.
The goal: Build a portfolio that feels like the work it showcases — considered, technical, and visually distinct. This is not a template. Every section, transition, and typographic choice should feel authored.

Design Philosophy
	
	•	Radial glow background. A single, slow-breathing radial glow anchors depth. It does not scroll. It is not a gradient fill — it is atmosphere.
	•	No emoji icons. Use Lucide React or Phosphor icons only, or custom SVGs.
	•	No inline styles. All styling lives in Tailwind utility classes or CSS custom properties.
	•	No generic gradients. No purple-to-blue, no rainbow mesh. Colour is intentional and rare.
	•	Typography is the layout. Type sets hierarchy. Spacing is generous. Nothing is cramped.
	•	Motion has intention. Animations answer a question: why does this move? If there is no answer, it does not move.

Tech Stack
Layer
Choice
Framework
Next.js 14 (App Router)
Language
TypeScript
Styling
Tailwind CSS + CSS custom properties
Components
ShadCN UI (customised to match dark theme)
Animation
GSAP (scroll-triggered) + Framer Motion (micro-interactions)
3D / Hero
Spline (primary) with Three.js fallback
Icons
Lucide React
Fonts
See Typography section
Deployment
Vercel

Animation Architecture
GSAP — Scroll-Triggered, Page-Level Orchestration
GSAP handles the big moments. All GSAP animations are scroll-triggered via ScrollTrigger.


Hero section     → Staggered fade-in: name → title → tagline → CTA (0.15s stagger)
Feature blocks   → Slide-in from alternating sides on scroll enter
Project cards    → Scale-up from 0.92 with opacity fade as they enter viewport
Skills / About   → Horizontal scrub text or counting numbers
Footer           → Fade up as page ends
Rules for GSAP:
	•	Register ScrollTrigger plugin once in a layout-level useEffect.
	•	Use gsap.context() for cleanup — no memory leaks.
	•	Scrub values: scrub: 1 for parallax, scrub: false + toggleActions for snap-in animations.
	•	Never animate width or height — animate scaleX/Y, opacity, y, x only.
Framer Motion — Component-Level Micro-Interactions
Framer Motion handles interaction feedback — the small, satisfying responses to user input.


Button hover     → scale(1.03) + subtle translateY(-2px) + shadow lift
Card hover       → translateY(-6px) + border glow brightens
Nav link hover   → underline slides in from left
Status dot       → keyframe pulse (opacity 1 → 0.4 → 1), 2s loop
Modal / Sheet    → AnimatePresence with slide-up + fade
Page transitions → Framer layout animations between route changes
Rules for Framer Motion:
	•	Use variants objects — not inline animate props — for reusability.
	•	whileHover and whileTap for interactive elements.
	•	Wrap list renders in AnimatePresence with mode="wait".
	•	Use useReducedMotion() hook to respect accessibility preferences.

Site Structure


/                   → Hero (Spline 3D + name, title, tagline, CTA)
/work               → Project index — filterable by category
/work/[slug]        → Individual project case study
/about              → About, background, tools, process
/contact            → Minimal contact form or mailto CTA
Navigation
	•	Sticky, minimal top nav: Logo (initials monogram) + links + subtle border-bottom on scroll.
	•	Mobile: hamburger → full-screen overlay menu with staggered link entrance.
	•	Active route: animated underline indicator.

Sections Breakdown
1. Hero
	•	Full viewport height.
	•	Spline 3D scene embedded (@splinetool/react-spline) — abstract, geometric, dark.
	•	Text layered on top: Name → Title → One-line descriptor → CTA pair.
	•	Radial glow behind the 3D scene.
	•	Scroll indicator: animated chevron or thin vertical line with dot.
2. Selected Work
	•	Grid of project cards. Desktop: 2-column asymmetric. Mobile: single column.
	•	Each card: project thumbnail / mockup, title, category tag, year.
	•	Filter row: All / Coding / HCI / Design — animated active indicator slides between tabs.
	•	Cards animate in on scroll with staggered scale-up.
3. About
	•	Split layout: left = text, right = a photo or abstract visual.
	•	Short, punchy bio — 3–4 sentences. No walls of text.
	•	Discipline tags rendered as minimal chips.
	•	Link to CV / résumé (PDF download).
4. Process / Approach (optional section)
	•	Three or four numbered principles that define how Aryan works.
	•	Each block slides in from the left on scroll enter.
5. Contact
	•	Minimal: email address (large, styled as a link), plus LinkedIn / GitHub icons.
	•	Optional: a short form with name + message.

Scalability rule: The project grid, filter system, and case study pages are all data-driven. Adding a project = adding one object and dropping assets into /public/projects/[slug]/. No component changes required.

ShadCN Component Usage
All ShadCN components must be re-skinned to match the dark theme before use.


Button      → Ghost and outline variants only. Solid variant uses accent colour.
Card        → Transparent background, `border border-white/8`, backdrop-blur.
Badge       → Used for category tags. Monospace font, uppercase, letter-spaced.
Sheet       → Mobile nav drawer.
Dialog      → Project lightbox / image zoom.
Tabs        → Work section filter.
Separator   → Section dividers, 1px, low opacity.
Do not use ShadCN's default styling without overriding to match the design system. Run npx shadcn@latest add [component]then immediately update globals.css CSS variables.

Development Rules
	1	Read CLAUDE.md and project_specs.md before every session.
	2	One feature per task. Each PR / commit does one thing.
	3	No any types. TypeScript is strict.
	4	No inline styles. Tailwind classes or CSS custom properties only.
	5	No !important. Fix specificity properly.
	6	Components are small. If a component exceeds ~120 lines, split it.
	7	Data is separate. Project content lives in /src/data/projects.ts — not in components.
	8	Images are optimised. Use next/image with width, height, and alt always set.
	9	Animations are opt-out. Wrap all motion in useReducedMotion() checks.
	10	Mobile-first. Build for 375px, then scale up. Nothing is desktop-only.


What This Is Not
	•	Not a template. Do not import Framer Motion landing page templates or ThemeForest themes.
	•	Not a component dump. Every element earns its place.
	•	Not "good enough." If it looks like a bootcamp portfolio, rebuild it.
