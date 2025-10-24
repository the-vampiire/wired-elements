## wired-listbox

### 1. Identity
- Tag: `wired-listbox`
- Class: `WiredListbox`
- Base: `LitElement`
- Purpose: Sketch-style listbox container for selectable items.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| value | { value: string, text: string } \| undefined | undefined | false | Current selected value object | ✅ | value |
| selected | string \| undefined | undefined | false | Selected value string | ✅ | selected |
| horizontal | boolean | false | false | Horizontal layout | ✅ | horizontal |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| selected | When selection changes | { selected: string \| undefined } | onSelected | (detail: { selected: string \| undefined }) => void |

### 5. Internal State
- State properties: `selected`, `value` (derived from selected)
- Can be controlled externally: `selected` via prop; `value` is read-only
- What event notifies change: `selected`
- Controlled vs uncontrolled: Partially controlled; `selected` prop sets state, but internal navigation changes it

### 6. Styling
- Inherits `BaseCSS`, adds layout and focus styles.
- Visual state depends on `horizontal`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host(:focus) path`, `::slotted(wired-item)`, `:host(.wired-horizontal) ::slotted(wired-item)`.
- CSS variables or parts: none.
- Dynamic visual computation: Rough.js draws rectangle border.
- Classes added by code: `.wired-horizontal`.
- Theming knobs: `horizontal`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredListboxProps {
  value?: { value: string; text: string };
  selected?: string;
  horizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelected?: (detail: { selected: string | undefined }) => void;
  children?: React.ReactNode;
  ref?: React.Ref<WiredListboxElement>;
}
```
Ref → WiredListboxElement
SSR: browser-only

### Proposed API Changes
None.