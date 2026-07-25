---
name: Infotechs Solutions
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d8c3b4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a08d80'
  outline-variant: '#524439'
  surface-tint: '#ffb77b'
  primary: '#ffb77b'
  on-primary: '#4d2700'
  primary-container: '#c8803f'
  on-primary-container: '#432100'
  inverse-primary: '#8c4f10'
  secondary: '#95cfe7'
  on-secondary: '#003544'
  secondary-container: '#065064'
  on-secondary-container: '#87c1d8'
  tertiary: '#ffb693'
  on-tertiary: '#562000'
  tertiary-container: '#ea6b1e'
  on-tertiary-container: '#4b1b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc2'
  primary-fixed-dim: '#ffb77b'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6d3a00'
  secondary-fixed: '#b9eaff'
  secondary-fixed-dim: '#95cfe7'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#014d61'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-sm:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
This design system embodies a "Premium Technological Minimalism" aesthetic, prioritizing precision, structural integrity, and editorial clarity. It is designed for a high-stakes professional environment where technical sophistication must be paired with luxury. 

The visual language rejects soft trends like glassmorphism in favor of a **Modular & High-Contrast** approach. Elements are treated as interconnected nodes within a systematic grid, utilizing a dark-mode-first strategy to create a sense of depth and focus. The emotional response is one of authority and innovative reliability, achieved through sharp layouts, generous whitespace, and a striking "Digital Copper" accentuation that mimics light flows and physical metallic reflections.

## Colors
The palette is rooted in **Deep Graphite (#1A1A1A)**, serving as a non-reflective, matte canvas that allows technical elements to recede or advance through contrast. 

- **Primary (Luminous Copper):** Used sparingly for high-value interactions, CTAs, and active states. It represents the "energy" or "data flow" within the system.
- **Secondary (Petrol Blue):** A deep, calming counterpoint to the warmth of copper, used for structural borders, secondary navigation, or specialized data categories.
- **Tertiary (Burnt Orange):** A support tone for the copper, used for hover states or status indicators to provide a sense of heat and activity.
- **Ivory (#F5F5F0):** The primary text color, chosen over pure white to reduce eye strain and provide a more "editorial" and sophisticated feel against the dark background.

## Typography
The typography system relies on a dual-sans approach to balance impact with technical utility. 

**Hanken Grotesk** is used for headlines. Its sharp terminals and modern geometry provide a "Strong Display" feel that is both professional and aggressive. Large display sizes should use tight letter spacing and heavy weights to achieve an editorial, poster-like quality.

**Geist** is the workhorse for body text and interface labels. Its mono-influenced spacing and technical precision reinforce the "Infotech" identity. Use the `label-md` style for navigation and metadata, applying uppercase styling to enhance the modular, "instrument-panel" feel of the UI.

## Layout & Spacing
This design system utilizes a **Fixed 12-Column Grid** for desktop applications to maintain strict editorial alignment. On mobile, the system transitions to a 4-column fluid layout with 16px margins.

The spacing rhythm is based on a **4px baseline**, ensuring all components align to a mathematical grid. Layouts should prioritize asymmetric compositions—for example, using a 4-column sidebar paired with an 8-column content area—to avoid the generic look of centralized web templates. Horizontal "rule lines" in Petrol Blue or subtle Graphite tints should be used to separate sections, mimicking technical blueprints.

## Elevation & Depth
Depth is created through **Tonal Layering** rather than traditional shadows. Surfaces are stacked to indicate hierarchy:
1.  **Level 0 (Floor):** Deep Graphite (#1A1A1A) for the main background.
2.  **Level 1 (Card/Module):** A slightly lighter graphite (#242424) to define content areas.
3.  **Level 2 (Active/Floating):** Outlined with a 1px Petrol Blue border.

Instead of ambient shadows, use **1px low-contrast outlines** to define boundaries. For interactive elements like "Luminous Copper" buttons, a soft, colored outer glow (Copper tint) can be used to simulate a light-emitting diode (LED) effect, reinforcing the "light flows" visual concept.

## Shapes
Shapes in this design system are predominantly **Soft (0.25rem)** to maintain a disciplined, engineering-focused look. 

While corners are not perfectly sharp (to avoid a dated, brutalist feel), the rounding is minimal. Buttons and input fields should strictly adhere to the `rounded-sm` (4px) standard. Circles are reserved exclusively for status indicators and "nodes" within modular diagrams to create a distinct visual contrast against the rectangular grid of the UI.

## Components
- **Buttons:** Primary buttons use a solid Luminous Copper background with Deep Graphite text. Secondary buttons are outlined in Petrol Blue with Ivory text. All buttons use the `label-md` typography style.
- **Input Fields:** Darker than the background (#121212) with a 1px Petrol Blue bottom border that transitions to Luminous Copper on focus.
- **Chips:** Small, rectangular tags with 1px borders. Use these for metadata or technical tags.
- **Cards:** No shadows. Defined by a 1px border (#2A2A2A) and a 4px corner radius. Headlines inside cards should be Hanken Grotesk.
- **Node Systems:** Use 1px Copper lines to connect related data points or modules, creating a "schematic" visual style.
- **Data Tables:** Highly structured with minimal vertical borders. Row headers use Hanken Grotesk, while data cells use Geist for maximum legibility.