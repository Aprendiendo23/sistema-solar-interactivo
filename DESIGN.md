# Design System Strategy: The Celestial Editorial

## 1. Overview & Creative North Star: "The Cosmic Curator"
The objective of this design system is to move beyond the "sci-fi dashboard" trope and into the realm of **High-End Celestial Editorial**. We are not building a control panel; we are curating a premium educational journey through the cosmos. 

**The Creative North Star: The Cosmic Curator.** 
The interface should feel like an immersive, high-definition telescope lens. It breaks the "template" look through **intentional asymmetry**, where content orbits a central focal point, and **tonal depth**, where elements float in a vacuum rather than sitting on a grid. We utilize extreme typographic contrast—pairing the technical, wide-set nature of `Space Grotesk` with the organic readability of `Plus Jakarta Sans`—to create a rhythm that feels both scientific and human.

---

## 2. Colors: The Depth of the Vacuum
We do not use "gray." We use varying densities of space. Our palette is built on the interaction between the infinite dark and the piercing light of a star.

### Core Tones
- **Primary (`#fff6df` / `#ffd700`):** Use for "Solar" moments. The primary color isn't just a button color; it’s a source of light.
- **Surface & Background (`#11131d`):** A deep, nocturnal navy that provides more "soul" than pure black.
- **Tertiary (`#e8faf9`):** A starlight-tinted white for high-readability body text.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** Boundaries are defined by:
1.  **Tonal Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Luminous Negative Space:** Using the spacing scale to let the dark background act as the separator.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, frosted lenses. 
- **Base Layer:** `surface-dim` (#11131d).
- **Secondary Content:** `surface-container-low` (#191b26).
- **Interactive Cards:** `surface-container` (#1d1f2a).
- **Floating Modals:** `surface-bright` (#373844) with a `backdrop-blur` of 20px.

### The "Glass & Gradient" Rule
To achieve "Visual Soul," CTAs must use a linear gradient: `primary_container` (#ffd700) to `primary_fixed_dim` (#e9c400). For floating UI, apply **Glassmorphism**: use `surface_variant` at 40% opacity with a `backdrop-filter: blur(12px)`.

---

## 3. Typography: The Galactic Scale
The typography is the architecture of the system. We use a "High-Contrast" scale to mimic the vastness of space.

*   **Display & Headlines (`Space Grotesk`):** Technical, slightly wide, and authoritative. 
    *   *Usage:* `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) for a "cinematic" title feel.
*   **Body & Titles (`Plus Jakarta Sans`):** Warm, geometric, and legible.
    *   *Usage:* `body-lg` (1rem) for all educational content. Ensure a line height of 1.6 to prevent "clumping" against the dark background.
*   **Labels (`Space Grotesk`):** All-caps, tracked out (+0.1em). This provides a "instrumentation" feel for metadata and small tags.

---

## 4. Elevation & Depth: Tonal Layering
In a vacuum, there are no shadows—only the presence or absence of light. We replace traditional Material shadows with **Tonal Layering**.

### The Layering Principle
Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in hue creates a "soft lift" that feels premium and integrated.

### Ambient Glows (The Shadow Alternative)
When an element must float (like a primary modal), do not use a black shadow. Use an **Ambient Glow**:
- **Shadow Color:** A 10% opacity version of `surface_tint` (#e9c400).
- **Spread:** Large (40px–60px), extra-diffused. This mimics the way a star illuminates the gas around it.

### The "Ghost Border" Fallback
If a container requires a boundary for accessibility, use a **Ghost Border**:
- **Token:** `outline-variant` (#4d4732).
- **Opacity:** 15% - 25%. 
- **Execution:** Never 100% opaque. It should feel like a faint glint on the edge of a lens.

---

## 5. Components: Precision Instruments

### Buttons
- **Primary:** Gradient fill (`primary_container` to `primary_fixed_dim`). No border. `xl` roundedness. On hover, add a 2px outer glow of the same color.
- **Secondary:** Glassmorphism style. `surface_variant` at 20% opacity + `backdrop-blur`. 
- **Tertiary:** Text-only, `Space Grotesk` label style, with a subtle `primary` underline that expands from center on hover.

### Cards & Lists
- **The Divider Ban:** Never use horizontal lines to separate list items. Use vertical white space (1.5rem to 2rem) or alternating subtle background shifts between `surface-container-low` and `surface-container-lowest`.
- **Nesting:** Educational modules should be contained in cards with `md` (0.75rem) roundedness to keep the feel "sleek" but approachable.

### Input Fields
- **Default State:** Background: `surface-container-highest`. Border: None.
- **Focus State:** A 1px "Ghost Border" at 40% opacity and a subtle internal glow from the `primary` token.
- **Labels:** Always use `label-md` in `Space Grotesk` positioned above the field, never inside.

### Signature Component: The "Star Path" Progress Bar
Instead of a flat bar, use a 2px track in `outline_variant` with a "comet head" (a 4px glowing dot of `primary`) leading the progress fill.

---

## 6. Do’s and Don’ts

### Do:
- **Do use Asymmetry:** Offset your headlines. Let an image bleed off the edge of the screen to create a sense of scale.
- **Do use "Breathing Room":** Space is vast. Your UI should be too. Use generous margins.
- **Do use Motion:** Transitions should be "Liquid-Smooth" (Cubic-bezier 0.4, 0, 0.2, 1). Elements should feel like they are drifting into place.

### Don’t:
- **Don't use pure #000000:** It kills the depth. Stick to the `surface` tokens.
- **Don't use 100% opaque borders:** They break the "Celestial" immersion and feel like a standard web template.
- **Don't crowd the viewport:** If a screen feels "busy," remove elements. High-end design is about what you leave out.
- **Don't use standard icons:** Use "Celestial-Inspired" stroke icons with 1.5pt weights and rounded terminals.