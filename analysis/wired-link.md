## wired-link

### 1. Identity
- Tag: `wired-link`
- Class: `WiredLink`
- Base: `WiredBase`
- Purpose: Sketch-style link with underline decoration.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Number of underlines (1–5) | ✅ | elevation |
| href | string \| undefined | undefined | false | Link URL | ✅ | href |
| target | string \| undefined | undefined | false | Link target | ✅ | target |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal anchor | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only link.

### 6. Styling
- Inherits `BaseCSS`, adds underline and focus styles.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `a, a:hover, a:visited`, `path`, `a:focus path`.
- CSS variables or parts: `--wired-link-decoration-color`.
- Dynamic visual computation: Rough.js draws underline lines based on `elevation`.
- Classes added by code: none.
- Theming knobs: `elevation`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredLinkProps {
  elevation?: number;
  href?: string;
  target?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredLinkElement
SSR: browser-only

### Proposed API Changes
None.