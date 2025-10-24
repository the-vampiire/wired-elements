## wired-tabs

### 1. Identity
- Tag: `wired-tabs`
- Class: `WiredTabs`
- Base: `LitElement`
- Purpose: Container for wired-tab elements with selection.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| selected | string \| undefined | undefined | false | Selected tab name | ✅ | selected |

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
- Inherits `BaseCSS`, adds bar and hidden styles.
- Visual state depends on `selected`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `::slotted(.hidden)`, `:host ::slotted(.hidden)`, `#bar`.
- CSS variables or parts: none.
- Dynamic visual computation: None; relies on child `wired-item` for tab rendering.
- Classes added by code: `.hidden`.
- Theming knobs: none.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `requestAnimationFrame`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredTabsProps {
  selected?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredTabsElement
SSR: browser-only

### Proposed API Changes
None.