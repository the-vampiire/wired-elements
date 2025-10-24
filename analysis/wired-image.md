## wired-image

### 1. Identity
- Tag: `wired-image`
- Class: `WiredImage`
- Base: `WiredBase`
- Purpose: Sketch-style image container with border and elevation.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Shadow depth (1–5) | ✅ | elevation |
| src | string | (empty image data URL) | false | Image source URL | ✅ | src |

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
- Inherits `BaseCSS`, adds image and border styles.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `img`, `path`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border based on `elevation`.
- Classes added by code: none.
- Theming knobs: `elevation`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredImageProps {
  elevation?: number;
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredImageElement
SSR: browser-only

### Proposed API Changes
None.