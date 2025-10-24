## wired-button

### 1. Identity
- Tag: `wired-button`
- Class: `WiredButton`
- Base: `WiredBase`
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.
- Purpose: Sketch-style button with rough SVG border and drop shadow.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Shadow depth (1–5) | ✅ | elevation |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal button element | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only component.

### 6. Styling
- Inherits `BaseCSS`, adds shadow and transition styles.
- Includes `BaseCSS` from `wired-base`, unless otherwise noted. `BaseCSS` provides fade-in opacity transition, overlay positioning for SVG, default path stroke using `currentColor`, and hidden class.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `path`, `button`, `button[disabled]`, `button:active path`, `button:focus path`, `button::-moz-focus-inner`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws based on `elevation`.
- Classes added by code: none.
- Theming knobs: `elevation`, `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Inherits browser-only redraw lifecycle from `WiredBase` (`ResizeObserver`, `getBoundingClientRect`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredButtonProps {
  elevation?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  ref?: React.Ref<WiredButtonElement>;
}
```
Ref → WiredButtonElement
SSR: browser-only

### Proposed API Changes
None.