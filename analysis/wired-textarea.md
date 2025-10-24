## wired-textarea

### 1. Identity
- Tag: `wired-textarea`
- Class: `WiredTextarea`
- Base: `WiredBase`
- Purpose: Sketch-style textarea.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |
| rows | number | 2 | false | Number of rows | ✅ | rows |
| maxrows | number | 0 | false | Maximum rows | ✅ | maxrows |
| autocomplete | string | '' | false | Autocomplete attribute | ✅ | autocomplete |
| autofocus | boolean | false | false | Autofocus | ✅ | autofocus |
| inputmode | string | '' | false | Input mode | ✅ | inputmode |
| placeholder | string | '' | false | Placeholder text | ✅ | placeholder |
| required | boolean | false | false | Required field | ✅ | required |
| readonly | boolean | false | false | Read-only | ✅ | readonly |
| minlength | number \| undefined | undefined | false | Minimum length | ✅ | minlength |
| maxlength | number \| undefined | undefined | false | Maximum length | ✅ | maxlength |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| change | When textarea value changes | { sourceEvent: Event } | onChange | (detail: { sourceEvent: Event }) => void |
| input | On input event | { sourceEvent: Event } | onInput | (detail: { sourceEvent: Event }) => void |

### 5. Internal State
- State property: `value` (via getter/setter)
- Can be controlled externally: yes, via `value` setter
- What event notifies change: `change`
- Controlled vs uncontrolled: Can be controlled via `value` prop; otherwise uncontrolled

### 6. Styling
- Inherits `BaseCSS`, adds textarea styles.
- Visual state depends on `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `textarea`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border.
- Classes added by code: none.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredTextareaProps {
  disabled?: boolean;
  rows?: number;
  maxrows?: number;
  autocomplete?: string;
  autofocus?: boolean;
  inputmode?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  minlength?: number;
  maxlength?: number;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { sourceEvent: Event }) => void;
  onInput?: (detail: { sourceEvent: Event }) => void;
}
```
Ref → WiredTextareaElement
SSR: browser-only

### Proposed API Changes
None.