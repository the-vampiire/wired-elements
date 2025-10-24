## wired-card

### 1. Identity
- Tag: `wired-card`
- Class: `WiredCard`
- Base: `WiredBase`
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.
- Purpose: Sketch-style card container with optional fill and elevation.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Shadow depth (1–5) | ✅ | elevation |
| fill | string \| undefined | undefined | false | Background fill color | ✅ | fill |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only container.

### 6. Styling
- Inherits `BaseCSS`, adds fill and stroke styles.
- Includes `BaseCSS` from `wired-base`, unless otherwise noted. `BaseCSS` provides fade-in opacity transition, overlay positioning for SVG, default path stroke using `currentColor`, and hidden class.
- Visual depth depends on `elevation`; fill affects background pattern.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `path.cardFill`, `path`.
- CSS variables or parts: `--wired-card-background-fill`.
- Dynamic visual computation: Rough.js draws based on `elevation` and `fill`.
- Classes added by code: none.
- Theming knobs: `elevation`, `fill`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Inherits browser-only redraw lifecycle from `WiredBase` (`ResizeObserver`, `getBoundingClientRect`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredCardProps {
  elevation?: number;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<WiredCardElement>;
}
```
Ref → WiredCardElement
SSR: browser-only

### Proposed API Changes
None.