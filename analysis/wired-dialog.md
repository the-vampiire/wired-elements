## wired-dialog

### 1. Identity
- Tag: `wired-dialog`
- Class: `WiredDialog`
- Base: `LitElement`
- Purpose: Modal dialog overlay with sketch-style card.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 5 | false | Shadow depth for card | ✅ | elevation |
| open | boolean | false | true | Shows/hides the dialog | ✅ | open |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- State property: `open`
- Can be controlled externally: yes, via `open` prop
- What event notifies change: none
- Controlled vs uncontrolled: Controlled; `open` prop controls visibility

### 6. Styling
- Defines overlay and transition styles.
- Visual state depends on `open` and `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `#container`, `#container::before`, `#overlay`, `.layout.vertical`, `.flex`, `wired-card`, `:host([open]) #container`, `:host([open]) #container::before`, `:host([open]) #overlay`.
- CSS variables or parts: `--wired-dialog-z-index`.
- Dynamic visual computation: None; relies on `wired-card` for sketch rendering.
- Classes added by code: none.
- Theming knobs: `elevation`, `open`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (contains `wired-card` which uses `ResizeObserver`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredDialogProps {
  elevation?: number;
  open?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
Ref → WiredDialogElement
SSR: browser-only

### Proposed API Changes
None.