

# Plan: Add Experience and Achievements Sections

## Overview
Add two new sections (Experience and Achievements) to the portfolio website, following the existing design patterns including: dark theme, cyan/blue gradient accents, font-mono typography, card-based layouts, and scroll-triggered staggered animations.

## Design System Analysis

The existing design system uses:
- **Colors**: Cyan-400, Blue-500, Purple variations, Gray-700/800/900 backgrounds
- **Typography**: `font-mono` throughout, gradient text for headings
- **Cards**: `bg-gray-900/50 backdrop-blur border border-gray-700` with hover effects
- **Animations**: Scale-in with staggered delays using IntersectionObserver
- **Section Headings**: `text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`
- **Section Container**: `min-h-screen py-20 px-4` with `max-w-6xl mx-auto`

---

## Implementation Steps

### 1. Create Experience Section Component

**File**: `src/components/Experience.tsx`

A vertical timeline with animated cards containing:

| Role | Company | Duration |
|------|---------|----------|
| Team Lead - Software Engineering Intern | Infosys Springboard | Nov 2025 - Jan 2026 |
| Machine Learning Intern | Edunet Foundation | Oct 2025 - Nov 2025 |
| Open Source Contributor | JabRef | Mar 2025 - Apr 2025 |

**Features**:
- Vertical timeline with connecting line (cyan gradient)
- Cards with role badge, company name, duration
- Bullet points for achievements
- Staggered scroll animation (matching Projects/Skills pattern)
- Timeline dots with glow effect

### 2. Create Achievements Section Component

**File**: `src/components/Achievements.tsx`

A responsive grid of achievement cards:

| Achievement | Type |
|-------------|------|
| TCS CodeVita 2025: Global Rank 156 | Competition |
| NASA Citizen Scientist (IASC) | Recognition |
| ISRO World Space Week 2024: 1st Place | Award |
| Google Cybersecurity Professional Certificate | Certification |
| Oracle AI Vector Search Certified Professional | Certification |

**Features**:
- Grid layout: `grid-cols-1 md:grid-cols-2` 
- Trophy/medal icons for achievements
- Certificate icon for certifications
- Staggered scroll animation
- Hover effects with gradient glow

### 3. Update Navigation Component

**File**: `src/components/Navigation.tsx`

Add two new navigation items:
- Experience section (chess symbol: `♚`)
- Achievements section (chess symbol: `♛`)

### 4. Update Index Page

**File**: `src/pages/Index.tsx`

Import and render the new sections in order:
1. Hero
2. About
3. Skills
4. **Experience** (new)
5. **Achievements** (new)
6. Projects
7. Contact

### 5. Add Custom Animation Keyframe

**File**: `tailwind.config.ts`

Add `scale-in` animation keyframe for the staggered card animations (if not already present).

---

## Technical Details

### Experience Timeline Structure

```text
+------------------+
|  TIMELINE LINE   |
|       |          |
|   [DOT]----------+---------------+
|       |          |   CARD        |
|       |          |   - Role      |
|       |          |   - Company   |
|       |          |   - Duration  |
|       |          |   - Bullets   |
|       |          +---------------+
|       |
|   [DOT]----------+---------------+
|       |          |   CARD        |
|       |          +---------------+
+------------------+
```

### Achievements Grid Structure

```text
+------------------------------------------+
|  [CARD: Award]      [CARD: Recognition]  |
|  [CARD: Award]      [CARD: Certification]|
|  [CARD: Certification]                   |
+------------------------------------------+
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/Experience.tsx` | Create new |
| `src/components/Achievements.tsx` | Create new |
| `src/components/Navigation.tsx` | Modify (add 2 nav items) |
| `src/pages/Index.tsx` | Modify (import and render new sections) |
| `tailwind.config.ts` | Modify (add scale-in keyframe if needed) |

