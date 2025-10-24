## wired-item

### 1. Identity
- Tag: `wired-item`
- Class: `WiredItem`
- Base: `WiredBase`
- Purpose: Sketch-style list item with selectable state.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| value | string | '' | false | Item value | ✅ | value |
| name | string | '' | false | Item name | ✅ | name |
| selected | boolean | false | false | Selected state | ✅ | selected |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- State property: `selected`
- Can be controlled externally: yes, via `selected` prop
- What event notifies change: none
- Controlled vs uncontrolled: Controlled; `selected` prop sets state

### 6. Styling
- Inherits `BaseCSS`, adds selection and hover styles.
- Visual state depends on `selected`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `button`, `button.selected`, `button::before`, `button span`, `button:active span`, `#overlay`, `button.selected #overlay`, `svg path`, `@media (hover: hover)`.
- CSS variables or parts: `--wired-item-selected-color`, `--wired-item-selected-bg`.
- Dynamic visual computation: Rough.js draws hachure fill when selected.
- Classes added by code: none.
- Theming knobs: `selected`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredItemProps {
  value?: string;
  name?: string;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredItemElement
SSR: browser-only

### Proposed API Changes
None.