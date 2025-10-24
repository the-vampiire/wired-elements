## wired-toggle

### 1. Identity
- Tag: `wired-toggle`
- Class: `WiredToggle`
- Base: `WiredBase`
- Purpose: Sketch-style toggle switch.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| checked | boolean | false | false | Checked state | ✅ | checked |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal input | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| change | When checked state changes | { checked: boolean } | onChange | (detail: { checked: boolean }) => void |

### 5. Internal State
- State property: `checked`
- Can be controlled externally: yes, via `checked` prop
- What event notifies change: `change`
- Controlled vs uncontrolled: Controlled; `checked` prop sets state

### 6. Styling
- Inherits `BaseCSS`, adds toggle and knob styles.
- Visual state depends on `checked` and `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `input`, `.knob`, `.knob path`, `.knob.checked`, `path.knobfill`, `.knob.unchecked path.knobfill`, `.knob.checked path.knobfill`.
- CSS variables or parts: `--wired-toggle-off-color`, `--wired-toggle-on-color`.
- Dynamic visual computation: Rough.js draws toggle bar and knob ellipse with hachure fill.
- Classes added by code: `.toggle-bar`, `.knob`, `.knobfill`, `.unchecked`, `.checked`.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (inherits from `WiredBase` which uses `ResizeObserver`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredToggleProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { checked: boolean }) => void;
}
```
Ref → WiredToggleElement
SSR: browser-only

### Proposed API Changes
None.