## wired-combo

### 1. Identity
- Tag: `wired-combo`
- Class: `WiredCombo`
- Base: `LitElement`
- Purpose: Sketch-style dropdown combo box for selecting from a list of items.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| value | { value: string, text: string } \| undefined | undefined | false | Current selected value object | ✅ | value |
| selected | string \| undefined | undefined | true | Selected value string | ✅ | selected |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

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
- Defines own styles with popup background.
- Visual state depends on `disabled`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host(.wired-disabled)`, `:host(.wired-rendered)`, `:host(:focus) path`, `#container`, `.inline`, `#textPanel`, `#dropPanel`, `.overlay`, `svg`, `path`, `#card`, `::slotted(wired-item)`.
- CSS variables or parts: `--wired-combo-popup-bg`.
- Dynamic visual computation: Rough.js draws combo outline and dropdown arrow.
- Classes added by code: `.wired-disabled`, `.wired-rendered`.
- Theming knobs: `disabled`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()` in `updated()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredComboProps {
  value?: { value: string; text: string };
  selected?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelected?: (detail: { selected: string | undefined }) => void;
  children?: React.ReactNode;
}
```
Ref → WiredComboElement
SSR: browser-only

### Proposed API Changes
None.