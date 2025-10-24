## wired-spinner

### 1. Identity
- Tag: `wired-spinner`
- Class: `WiredSpinner`
- Base: `WiredBase`
- Purpose: Sketch-style animated loading spinner.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| spinning | boolean | false | false | Whether to animate | ✅ | spinning |
| duration | number | 1500 | false | Animation duration in ms | ✅ | duration |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; animation controlled by `spinning` prop.

### 6. Styling
- Inherits `BaseCSS`, adds knob and path styles.
- Visual state depends on `spinning`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `path`, `.knob`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws ellipse outline and hachure knob; animation updates position.
- Classes added by code: `.knob`.
- Theming knobs: none.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `window.requestAnimationFrame`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredSpinnerProps {
  spinning?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredSpinnerElement
SSR: browser-only

### Proposed API Changes
None.