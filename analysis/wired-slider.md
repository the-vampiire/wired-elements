## wired-slider

### 1. Identity
- Tag: `wired-slider`
- Class: `WiredSlider`
- Base: `WiredBase`
- Purpose: Sketch-style range slider.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| min | number | 0 | false | Minimum value | ✅ | min |
| max | number | 100 | false | Maximum value | ✅ | max |
| step | number | 1 | false | Step value | ✅ | step |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal input | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| change | When slider value changes | { value: number } | onChange | (detail: { value: number }) => void |

### 5. Internal State
- State property: `value` (via getter/setter)
- Can be controlled externally: yes, via `value` setter
- What event notifies change: `change`
- Controlled vs uncontrolled: Can be controlled via `value` prop; otherwise uncontrolled

### 6. Styling
- Inherits `BaseCSS`, adds slider and knob styles.
- Visual state depends on `value`, `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `input[type=range]`, `input[type=range]:focus`, `input[type=range]::-ms-track`, `input[type=range]::-moz-focus-outer`, `input[type=range]::-moz-range-thumb`, `input[type=range]::-webkit-slider-thumb`, `.knob`, `.bar`, `input:focus + div svg .knob`.
- CSS variables or parts: `--wired-slider-knob-color`, `--wired-slider-bar-color`, `--wired-slider-knob-outline-color`.
- Dynamic visual computation: Rough.js draws bar line and knob ellipse; knob position based on value.
- Classes added by code: `.knob`, `.bar`.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredSliderProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  value?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { value: number }) => void;
}
```
Ref → WiredSliderElement
SSR: browser-only

### Proposed API Changes
None.