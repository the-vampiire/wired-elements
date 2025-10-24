## wired-progress-ring

### 1. Identity
- Tag: `wired-progress-ring`
- Class: `WiredProgressRing`
- Base: `WiredBase`
- Purpose: Sketch-style circular progress indicator.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| value | number | 0 | false | Current value | ✅ | value |
| min | number | 0 | false | Minimum value | ✅ | min |
| max | number | 100 | false | Maximum value | ✅ | max |
| hideLabel | boolean | false | false | Hide label | ✅ | hideLabel |
| showLabelAsPercent | boolean | false | false | Show label as percent | ✅ | showLabelAsPercent |
| precision | number | 0 | false | Precision for percent | ✅ | precision |

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
- Inherits `BaseCSS`, adds progress arc and label styles.
- Visual state depends on `value`, `min`, `max`, `hideLabel`, `showLabelAsPercent`, `precision`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `#overlay`, `path.progressArc`, `#labelPanel`.
- CSS variables or parts: `--wired-progress-color`.
- Dynamic visual computation: Rough.js draws ellipse outline and progress arc based on value.
- Classes added by code: none.
- Theming knobs: `value`, `min`, `max`, `hideLabel`, `showLabelAsPercent`, `precision`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredProgressRingProps {
  value?: number;
  min?: number;
  max?: number;
  hideLabel?: boolean;
  showLabelAsPercent?: boolean;
  precision?: number;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredProgressRingElement
SSR: browser-only

### Proposed API Changes
None.