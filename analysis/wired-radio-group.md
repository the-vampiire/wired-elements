## wired-radio-group

### 1. Identity
- Tag: `wired-radio-group`
- Class: `WiredRadioGroup`
- Base: `LitElement`
- Purpose: Container for wired-radio elements to manage selection.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| selected | string \| undefined | undefined | false | Selected radio name | ✅ | selected |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| selected | When selection changes | { selected: string \| undefined } | onSelected | (detail: { selected: string \| undefined }) => void |

### 5. Internal State
- State property: `selected`
- Can be controlled externally: yes, via `selected` prop
- What event notifies change: `selected`
- Controlled vs uncontrolled: Controlled; `selected` prop sets state

### 6. Styling
- Defines padding styles for slotted items.
- Visual state depends on `selected`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host ::slotted(*)`.
- CSS variables or parts: `--wired-radio-group-item-padding`.
- Dynamic visual computation: None; relies on child `wired-radio` elements.
- Classes added by code: none.
- Theming knobs: none.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Likely SSR-safe (no DOM measurements or browser APIs used directly).
- Child `wired-radio` elements may require browser-only rendering.

### 8. React Wrapper Surface
```ts
interface WiredRadioGroupProps {
  selected?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelected?: (detail: { selected: string | undefined }) => void;
  children?: React.ReactNode;
  ref?: React.Ref<WiredRadioGroupElement>;
}
```
Ref → WiredRadioGroupElement
SSR: likely safe

### Proposed API Changes
None.