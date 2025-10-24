## wired-radio

### 1. Identity
- Tag: `wired-radio`
- Class: `WiredRadio`
- Base: `WiredBase`
- Purpose: Sketch-style radio button.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| checked | boolean | false | false | Checked state | ✅ | checked |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |
| name | string \| undefined | undefined | false | Radio name | ✅ | name |

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
- Inherits `BaseCSS`, adds focus and disabled styles.
- Visual state depends on `checked` and `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `#container`, `span`, `input`, `path`, `g path`, `#container.focused`.
- CSS variables or parts: `--wired-radio-icon-color`, `--wired-radio-default-swidth`.
- Dynamic visual computation: Rough.js draws ellipse outline and filled circle when checked.
- Classes added by code: none.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (inherits from `WiredBase` which uses `ResizeObserver`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredRadioProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { checked: boolean }) => void;
  children?: React.ReactNode;
}
```
Ref → WiredRadioElement
SSR: browser-only

### Proposed API Changes
None.