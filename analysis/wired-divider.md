## wired-divider

### 1. Identity
- Tag: `wired-divider`
- Class: `WiredDivider`
- Base: `WiredBase`
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.
- Purpose: Sketch-style horizontal divider line.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Number of lines (1–5) | ✅ | elevation |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only component.

### 6. Styling
- Inherits `BaseCSS`.
- Includes `BaseCSS` from `wired-base`, unless otherwise noted. `BaseCSS` provides fade-in opacity transition, overlay positioning for SVG, default path stroke using `currentColor`, and hidden class.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws multiple lines based on `elevation`.
- Classes added by code: none.
- Theming knobs: `elevation`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Inherits browser-only redraw lifecycle from `WiredBase` (`ResizeObserver`, `getBoundingClientRect`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredDividerProps {
  elevation?: number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<WiredDividerElement>;
}
```
Ref → WiredDividerElement
SSR: browser-only

### Proposed API Changes
None.