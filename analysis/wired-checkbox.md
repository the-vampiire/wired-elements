## wired-checkbox

### 1. Identity
- Tag: `wired-checkbox`
- Class: `WiredCheckbox`
- Base: `WiredBase`
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.
- Purpose: Sketch-style checkbox input with checkmark.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| checked | boolean | false | false | Checked state | ✅ | checked |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal input element | ✅ |

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
- Includes `BaseCSS` from `wired-base`, unless otherwise noted. `BaseCSS` provides fade-in opacity transition, overlay positioning for SVG, default path stroke using `currentColor`, and hidden class.
- Visual state depends on `checked` and `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `#container`, `span`, `input`, `path`, `g path`, `#container.focused`.
- CSS variables or parts: `--wired-checkbox-icon-color`, `--wired-checkbox-default-swidth`.
- Dynamic visual computation: Rough.js draws checkbox outline; checkmark visibility based on `checked`.
- Classes added by code: none.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (inherits from `WiredBase` which uses `ResizeObserver`).
- Inherits browser-only redraw lifecycle from `WiredBase` (`ResizeObserver`, `getBoundingClientRect`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { checked: boolean }) => void;
  children?: React.ReactNode;
  ref?: React.Ref<WiredCheckboxElement>;
}
```
Ref → WiredCheckboxElement
SSR: browser-only

### Proposed API Changes
None.