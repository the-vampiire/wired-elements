## wired-divider

### 1. Identity
- Tag: `wired-divider`
- Class: `WiredDivider`
- Base: `WiredBase`
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
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredDividerProps {
  elevation?: number;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredDividerElement
SSR: browser-only

### Proposed API Changes
None.