## wired-fab

### 1. Identity
- Tag: `wired-fab`
- Class: `WiredFab`
- Base: `WiredBase`
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.
- Purpose: Sketch-style floating action button with circular fill.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

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
- Inherits `BaseCSS`, adds circular button and icon styles.
- Includes `BaseCSS` from `wired-base`, unless otherwise noted. `BaseCSS` provides fade-in opacity transition, overlay positioning for SVG, default path stroke using `currentColor`, and hidden class.
- Visual state depends on `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `button`, `button[disabled]`, `button::-moz-focus-inner`, `button ::slotted(*)`, `path`, `button:focus ::slotted(*)`, `button:active ::slotted(*)`.
- CSS variables or parts: `--wired-fab-bg-color`, `--wired-icon-size`.
- Dynamic visual computation: Rough.js draws circular hachure fill.
- Classes added by code: none.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Inherits browser-only redraw lifecycle from `WiredBase` (`ResizeObserver`, `getBoundingClientRect`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredFabProps {
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  ref?: React.Ref<WiredFabElement>;
}
```
Ref → WiredFabElement
SSR: browser-only

### Proposed API Changes
None.