## wired-tab

### 1. Identity
- Tag: `wired-tab`
- Class: `WiredTab`
- Base: `WiredBase`
- Purpose: Sketch-style tab item.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| name | string | '' | false | Tab name | ✅ | name |
| label | string | '' | false | Tab label | ✅ | label |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only tab item.

### 6. Styling
- Inherits `BaseCSS`.
- Visual state depends on none.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border.
- Classes added by code: none.
- Theming knobs: none.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredTabProps {
  name?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredTabElement
SSR: browser-only

### Proposed API Changes
None.