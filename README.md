# TaskNova

Your Productivity Universe

## Overview

TaskNova reimagines the traditional to-do list as a futuristic productivity command center floating inside a living galaxy. Instead of "tasks," users launch "missions" into their personal universe — each one orbiting around a central core until completed. The goal is to make task management feel exciting and exploratory while remaining instantly understandable and fully functional.

**Tagline:** Your Productivity Universe

**Supporting text:** Turn Every Task Into A Mission.

## Features

- **Mission Creation** — Add missions with a title and priority (High / Medium / Low); empty submissions are prevented with inline validation
- **Mission Management** — Complete/uncomplete, edit, and delete (abort) any mission
- **Search** — Case-insensitive, real-time search by mission title
- **Status Filters** — All, Active, Completed
- **Priority Filters** — All, High, Medium, Low
- **Combined Filtering** — Search + status + priority work together simultaneously
- **Dynamic Statistics** — Total, Completed, and Pending counts derived from the task source of truth
- **Universe Progress** — Circular SVG progress ring showing `completed / total × 100` with animated count-up
- **Dynamic Universe Status** — Progress-based messages that change as completion increases
- **Cosmic Milestones** — Unlockable achievements based on completed mission count
- **LocalStorage Persistence** — Tasks survive page refresh using the `tasknova_tasks` storage key
- **Toast Notifications** — Accessible, non-blocking feedback for every action (launch, complete, update, abort)
- **Skip Link** — Keyboard users can bypass navigation directly to the mission list

## Innovation

### Mission Control
The dashboard is framed as a command center. A decorative orbit-map visualization shows priority breakdowns as concentric rings with glowing particles, surrounding a floating TaskNova core. This reinforces the universe metaphor without replacing the functional task list.

### Universe Progress
A lightweight SVG circular progress ring with gradient stroke, orbiting particle, and animated percentage. The ring updates immediately when tasks change and displays a dynamic status message based on real progress data.

### Cosmic Milestones
A lightweight gamification layer that displays earned milestones (First Mission, Rising Explorer, Cosmic Builder, Universe Master) and shows the next locked milestone with progress required to unlock it.

### Dynamic Universe Status
Five progress-tiered messages that respond to actual completion percentage — from "Universe awaiting its first mission" to "Universe fully synchronized."

### Galaxy/Universe Interaction Concept
The entire visual environment — layered nebula clouds, CSS-based star fields, constellation grids, shooting stars, and orbit paths — creates an immersive deep-space atmosphere using only CSS gradients and animations. No heavy 3D engines or large image assets.

## Technology Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite 5** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon library
- **CSS Custom Animations** — Galaxy effects, transitions, micro-interactions

## Architecture

```
User
  ↓
React UI (Components)
  ↓
Task State (useTasks hook)
  ↓
Task Utilities (filterMissions, computeStats, milestones)
  ↓
Storage Utilities (safe JSON parse/save)
  ↓
LocalStorage (tasknova_tasks)
```

### Separation of Concerns

- **Components** — Pure presentation and user interaction. No business logic.
- **Hooks** — `useTasks` centralizes task state, CRUD operations, and persistence. The single source of truth is the `tasks` array; all derived values (filtered lists, statistics) are computed from it.
- **Utilities** — `storage.ts` handles safe LocalStorage read/write with validation. `taskUtils.ts` contains pure functions for filtering, statistics computation, milestone logic, and formatting.
- **Types** — Shared TypeScript types and constants (Priority, Mission, filters, progress messages).

## Data Model

```typescript
interface Mission {
  id: string;          // e.g. "tn-001-lxyz123"
  title: string;       // User-entered mission name
  priority: Priority;  // 'high' | 'medium' | 'low'
  completed: boolean;  // Completion state
  createdAt: number;   // Unix timestamp (milliseconds)
}
```

Stored in LocalStorage under the key `tasknova_tasks` as a JSON array.

## Accessibility

- **Semantic HTML** — `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, `<form>`, `<fieldset>`, `<legend>`, `<time>` elements used appropriately
- **Heading Hierarchy** — Single `<h1>` (TASKNOVA), `<h2>` for sections, `<h3>` for mission titles
- **Form Labels** — All inputs have visible or `sr-only` labels; placeholder is never the only label
- **Accessible Buttons** — All icon-only buttons have descriptive `aria-label` attributes (e.g., "Edit mission: Complete DSA Practice")
- **Accessible Checkbox** — Completion toggle uses `aria-pressed` and descriptive `aria-label`
- **Modal Accessibility** — `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape to close, focus trap with Tab cycling, focus moves into modal on open
- **Keyboard Navigation** — All interactive elements are focusable and operable via keyboard
- **Visible Focus States** — 2px violet outline with offset on all focusable elements
- **ARIA Live Regions** — Mission list uses `aria-live="polite"` for filter changes; stat counters use `aria-live="polite"`; toast container uses `role="status"` with `aria-live="polite"`
- **Reduced Motion** — `prefers-reduced-motion: reduce` disables shooting stars, orbit animations, float effects, and pulse animations while keeping functional transitions minimal
- **Contrast** — Text colors meet WCAG AA contrast ratios against the dark space background
- **No Color-Only Meaning** — Priority is always communicated with text labels (HIGH / MEDIUM / LOW) in addition to color

## Responsive Design

- **Mobile (320–430px)** — Single-column layout, full-width inputs and buttons, horizontally scrollable filter pills, compact statistics grid, hero text scales down, modals fit screen width
- **Tablet (768px)** — Statistics become 3-column grid, mission control visualization and launch form stack vertically
- **Desktop (1024px+)** — Two-column mission control (orbit map + launch form side by side), full navigation bar with cosmic clock, larger hero typography
- **Wide Desktop (1440px+)** — Content centered with max-width constraints, generous spacing

No horizontal scrolling at any breakpoint. All content remains readable and interactable.

## Performance

- **CSS-Based Galaxy** — Stars use `background-image` with `radial-gradient` patterns tiled across 3 layers — zero React elements for star rendering
- **No Heavy Libraries** — No 3D engines, no animation libraries, no large background images or videos
- **Lightweight SVG** — Progress ring and favicon are small inline SVG with CSS filters
- **Memoization** — `useMemo` for filtered missions and computed statistics; `useCallback` for stable handler references
- **Minimal DOM** — Galaxy background uses ~10 fixed DOM elements total (nebulas, star layers, shooting stars, vignette)
- **Efficient Animations** — All animations use `transform` and `opacity` (GPU-accelerated); `will-change` applied to animated nebula clouds
- **No Render-Loop Animations** — Count-up and progress animations use `requestAnimationFrame` only during transitions, not continuously

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the Vite dev server with hot module replacement.

## Production Build

```bash
npm run build
```

Outputs optimized static assets to `dist/`. Run `npm run preview` to serve the build locally.

## Deployment

The production build in `dist/` contains static HTML, CSS, and JavaScript. Deploy to any static hosting provider:

- **Vercel / Netlify** — Connect the repository and set build command to `npm run build` with output directory `dist`
- **GitHub Pages** — Copy `dist/` contents to the `gh-pages` branch
- **Any web server** — Serve the `dist/` directory

No server-side runtime is required — all data persists in the browser's LocalStorage.

## Project Structure

```
src/
  components/
    GalaxyBackground.tsx       — CSS-based deep-space environment
    NavBar.tsx                 — Fixed navigation with scroll spy + cosmic clock
    Hero.tsx                   — Cinematic landing with orbiting logo
    Stats.tsx                  — Animated statistic cards
    MissionControlViz.tsx      — Decorative orbit-map visualization
    LaunchMission.tsx          — Mission creation form with validation
    SearchBar.tsx              — Real-time search input
    FilterBar.tsx              — Status + priority pill filters
    MissionCard.tsx            — Individual mission display card
    EmptyState.tsx             — Empty universe + no-results states
    ProgressRing.tsx           — SVG cosmic progress ring
    CosmicMilestones.tsx       — Achievement milestone display
    EditModal.tsx              — Accessible edit dialog with focus trap
    DeleteModal.tsx            — Accessible delete confirmation dialog
    Toast.tsx                  — Notification system + container
  hooks/
    useTasks.ts                — Task state, CRUD, persistence
  utils/
    storage.ts                 — Safe LocalStorage read/write
    taskUtils.ts               — Filtering, stats, milestones, formatting
  types.ts                     — Shared types and constants
  App.tsx                      — Root component, section composition
  main.tsx                     — React entry point
  index.css                    — Global styles + galaxy animations
```

## Browser Storage

TaskNova uses the LocalStorage key `tasknova_tasks` to persist all mission data as a JSON array. The storage utility:

- Safely parses JSON with try/catch
- Returns an empty array on missing or malformed data
- Validates each mission object's shape before loading
- Never crashes the application due to invalid storage
- Saves only validated task data

## Future Enhancements

- Drag-and-drop mission reordering
- Due dates and reminders
- Mission categories/tags
- Export/import data as JSON
- Multi-device sync via cloud storage
