## wired-card

### 1. Identity
- Tag: `wired-card`
- Class: `WiredCard`
- Base: `WiredBase`
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
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredCardProps {
  elevation?: number;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredCardElement
SSR: browser-only

### Proposed API Changes
None.