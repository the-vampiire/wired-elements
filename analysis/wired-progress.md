## wired-progress

### 1. Identity
- Tag: `wired-progress`
- Class: `WiredProgress`
- Base: `WiredBase`
- Purpose: Sketch-style linear progress bar.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| value | number | 0 | false | Current value | ✅ | value |
| min | number | 0 | false | Minimum value | ✅ | min |
| max | number | 100 | false | Maximum value | ✅ | max |
| percentage | boolean | false | false | Show as percentage | ✅ | percentage |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- State property: `value`
- Can be controlled externally: yes, via `value` prop
- What event notifies change: none
- Controlled vs uncontrolled: Controlled; `value` prop sets progress

### 6. Styling
- Inherits `BaseCSS`, adds progress fill and label styles.
- Visual state depends on `value`, `min`, `max`, `percentage`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `.labelContainer`, `.progressLabel`, `path.progbox`, `.overlay`.
- CSS variables or parts: `--wired-progress-label-color`, `--wired-progress-font-size`, `--wired-progress-label-background`, `--wired-progress-color`.
- Dynamic visual computation: Rough.js draws rectangle outline and hachure fill based on value.
- Classes added by code: none.
- Theming knobs: `value`, `min`, `max`, `percentage`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredProgressProps {
  value?: number;
  min?: number;
  max?: number;
  percentage?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredProgressElement
SSR: browser-only

### Proposed API Changes
None.