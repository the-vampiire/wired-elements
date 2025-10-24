## wired-input

### 1. Identity
- Tag: `wired-input`
- Class: `WiredInput`
- Base: `WiredBase`
- Purpose: Sketch-style text input field.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |
| placeholder | string | '' | false | Placeholder text | ✅ | placeholder |
| name | string \| undefined | undefined | false | Input name | ✅ | name |
| min | string \| undefined | undefined | false | Minimum value | ✅ | min |
| max | string \| undefined | undefined | false | Maximum value | ✅ | max |
| step | string \| undefined | undefined | false | Step value | ✅ | step |
| type | string | 'text' | false | Input type | ✅ | type |
| autocomplete | string | '' | false | Autocomplete attribute | ✅ | autocomplete |
| autocapitalize | string | '' | false | Autocapitalize attribute | ✅ | autocapitalize |
| autocorrect | boolean | false | true | Autocorrect attribute | ✅ | autocorrect |
| required | boolean | false | false | Required field | ✅ | required |
| autofocus | boolean | false | false | Autofocus | ✅ | autofocus |
| readonly | boolean | false | false | Read-only | ✅ | readonly |
| minlength | number \| undefined | undefined | false | Minimum length | ✅ | minlength |
| maxlength | number \| undefined | undefined | false | Maximum length | ✅ | maxlength |
| size | number \| undefined | undefined | false | Size attribute | ✅ | size |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses the internal input | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| change | When input value changes | { sourceEvent: Event } | onChange | (detail: { sourceEvent: Event }) => void |
| input | On input event | { sourceEvent: Event } | onInput | (detail: { sourceEvent: Event }) => void |

### 5. Internal State
- State property: `value` (via getter/setter)
- Can be controlled externally: yes, via `value` setter
- What event notifies change: `change`
- Controlled vs uncontrolled: Can be controlled via `value` prop; otherwise uncontrolled

### 6. Styling
- Inherits `BaseCSS`, adds input and focus styles.
- Visual state depends on `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `input`, `input:focus + div path`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border.
- Classes added by code: none.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredInputProps {
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  min?: string;
  max?: string;
  step?: string;
  type?: string;
  autocomplete?: string;
  autocapitalize?: string;
  autocorrect?: boolean;
  required?: boolean;
  autofocus?: boolean;
  readonly?: boolean;
  minlength?: number;
  maxlength?: number;
  size?: number;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { sourceEvent: Event }) => void;
  onInput?: (detail: { sourceEvent: Event }) => void;
}
```
Ref → WiredInputElement
SSR: browser-only

### Proposed API Changes
None.