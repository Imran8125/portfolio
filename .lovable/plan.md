

# Plan: Transform Theme to Theoretical Physics & General Relativity

## Overview
Replace all chess-themed visual elements with physics-inspired aesthetics while maintaining the existing Space + Coding dark mode design system (neon cyan, purple, monospace fonts).

---

## Summary of Changes

| Component | Current (Chess) | New (Physics) |
|-----------|-----------------|---------------|
| Navigation icons | Chess pieces (♔♕♗♚♛♖♘) | Lucide physics icons (Atom, Globe, Activity, etc.) |
| Hero floating elements | Chess pieces | Physics formulas (E=mc², λ, Σ, ∇) |
| Hero buttons | Chess symbols | Lucide icons (Rocket, Download) |
| Hero grid | 8x8 chessboard | Curved spacetime grid |
| About visual | Chessboard with orbiting pieces | Atom model with electron orbits |
| About text | "strategic thinking of chess" | "elegance of physics" |
| Projects badges | ♟ ♘ ♖ prefixes | Lucide icons |
| Background | Stars only | Stars + warped grid + floating formulas |

---

## Implementation Details

### 1. Navigation Component (`src/components/Navigation.tsx`)

Replace chess piece symbols with Lucide React icons:

| Section | Chess | Physics Icon | Why |
|---------|-------|--------------|-----|
| Home | ♔ | `Atom` | Fundamental building block |
| About | ♕ | `Orbit` | Personal orbit/journey |
| Skills | ♗ | `Zap` | Energy/power |
| Experience | ♚ | `Activity` | Wave/pulse (light waves) |
| Achievements | ♛ | `Star` | Stars/recognition |
| Projects | ♖ | `Globe` | Spacetime/gravity well |
| Contact | ♘ | `Radio` | Signal transmission |

Update comment from "Chess piece scroll indicator" to "Physics-themed scroll indicator".

### 2. Hero Component (`src/components/Hero.tsx`)

**Button Icons:**
- "View Projects" button: Replace ♞ with `Rocket` icon
- "Download Resume" button: Replace ♜ with `FileDown` icon

**Floating Elements:**
Replace chess pieces with physics formulas using monospace styling:
- `E=mc²` (mass-energy equivalence)
- `λ` (wavelength)
- `Σ` (summation)
- `∇` (nabla/gradient operator)

**Background Grid:**
Transform 8x8 chessboard into curved spacetime visualization:
- Use CSS perspective and transforms to create warped grid effect
- Lines curving toward center (gravity well effect)

### 3. About Component (`src/components/About.tsx`)

**Visual Element:**
Replace chessboard with revolving chess pieces with an **Atom Model**:
- Central nucleus (glowing sphere)
- Electron orbits with particles
- Keep the same orbit animation structure
- Replace chess symbols with electron dots

**Text Update:**
Change: "My journey combines the strategic thinking of chess with the precision of code"
To: "My journey combines the elegance of physics with the precision of code"

### 4. Background Effects (`src/components/BackgroundEffects.tsx`)

**Add Physics Elements:**

1. **Warped Grid Overlay**: Faint curved lines representing spacetime curvature
2. **Floating Formulas**: Slowly drifting physics symbols (E=mc², λ, ∫, Σ, ∂, ℏ)
3. **Keep existing stars** but add subtle glow variations

Implementation approach:
- Add a second canvas layer for the grid effect
- Create formula particles that drift slowly (similar to stars but with text)
- Grid uses perspective transforms for 3D warping effect

### 5. Projects Component (`src/components/Projects.tsx`)

Update project type badges to remove chess symbols:

| Current | New |
|---------|-----|
| `♟ AI Agent` | `AI Agent` (with Bot icon) |
| `♘ Backend App` | `Backend App` (with Server icon) |
| `♖ Simulation Tool` | `Simulation Tool` (with Orbit icon) |
| `♘ Desktop App` | `Desktop App` (with Monitor icon) |

### 6. New Physics Grid Component (`src/components/PhysicsGrid.tsx`)

Create a reusable curved spacetime grid overlay:
- Uses CSS/SVG for curved grid lines
- Subtle opacity (5-10%)
- Centers around a "gravity well" point
- Can be applied to Hero section

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Navigation.tsx` | Replace chess symbols with Lucide icons |
| `src/components/Hero.tsx` | New floating formulas, button icons, curved grid |
| `src/components/About.tsx` | Atom model instead of chessboard, text update |
| `src/components/BackgroundEffects.tsx` | Add warped grid + floating formulas |
| `src/components/Projects.tsx` | Remove chess symbols from type badges |

---

## Technical Details

### Lucide Icons to Import

```typescript
import { 
  Atom,        // Home
  Orbit,       // About  
  Zap,         // Skills
  Activity,    // Experience
  Star,        // Achievements
  Globe,       // Projects
  Radio,       // Contact
  Rocket,      // View Projects button
  FileDown,    // Download Resume button
  Bot,         // AI Agent badge
  Server,      // Backend App badge
  Monitor      // Desktop App badge
} from 'lucide-react';
```

### Floating Physics Formulas
```typescript
const formulas = [
  { text: 'E=mc²', delay: '0s' },
  { text: 'λ', delay: '0.5s' },
  { text: '∑', delay: '1s' },
  { text: '∇²ψ', delay: '1.5s' },
  { text: 'ℏ', delay: '2s' }
];
```

### Curved Grid CSS Approach
```css
.spacetime-grid {
  perspective: 1000px;
  transform-style: preserve-3d;
  /* Grid lines use radial gradient for curve effect */
}
```

---

## Visual Outcome

The website will feel like a **futuristic scientific interface** with:
- Atomic/orbital motifs replacing chess pieces
- Curved spacetime grids instead of chessboards
- Floating physics equations drifting in the background
- Same neon cyan/purple/dark aesthetic for "high-energy physics" look
- All existing animations and scroll effects preserved

