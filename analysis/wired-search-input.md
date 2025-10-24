## wired-search-input

### 1. Identity
- Tag: `wired-search-input`
- Class: `WiredSearchInput`
- Base: `WiredBase`
- Purpose: Sketch-style search input with icons.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |
| placeholder | string | '' | false | Placeholder text | ✅ | placeholder |
| autocomplete | string | '' | false | Autocomplete attribute | ✅ | autocomplete |
| autocorrect | boolean | false | true | Autocorrect attribute | ✅ | autocorrect |
| autofocus | boolean | false | false | Autofocus | ✅ | autofocus |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

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
- Inherits `BaseCSS`, adds input and icon styles.
- Visual state depends on `value` and `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host([disabled])`, `:host([disabled]) svg`, `input`, `input[type=search]::-ms-clear`, `input[type=search]::-ms-reveal`, `input[type="search"]::-webkit-search-decoration`, `input[type="search"]::-webkit-search-cancel-button`, `input[type="search"]::-webkit-search-results-button`, `input[type="search"]::-webkit-search-results-decoration`, `.thicker path`, `button`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border and search/close icons.
- Classes added by code: `.thicker`.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredSearchInputProps {
  disabled?: boolean;
  placeholder?: string;
  autocomplete?: string;
  autocorrect?: boolean;
  autofocus?: boolean;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (detail: { sourceEvent: Event }) => void;
  onInput?: (detail: { sourceEvent: Event }) => void;
}
```
Ref → WiredSearchInputElement
SSR: browser-only

### Proposed API Changes
None.