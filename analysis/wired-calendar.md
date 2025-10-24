## wired-calendar

### 1. Identity
- Tag: `wired-calendar`
- Class: `WiredCalendar`
- Base: `LitElement`
- Purpose: Interactive calendar component with sketch-style rendering for date selection.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 3 | false | Shadow depth (1–5) | ✅ | elevation |
| selected | string \| undefined | undefined | false | Pre-selected date string | ✅ | selected |
| firstdate | string \| undefined | undefined | false | Date range lower limit | ✅ | firstdate |
| lastdate | string \| undefined | undefined | false | Date range higher limit | ✅ | lastdate |
| locale | string \| undefined | undefined | false | BCP 47 language tag | ✅ | locale |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |
| initials | boolean | false | true | Use initials for days of week | ✅ | initials |
| value | { date: Date, text: string } \| undefined | undefined | false | Current selected value object | ✅ | value |
| format | Function | (d: Date) => string | false | Date formatting function | ✅ | format |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| setSelectedDate(formatedDate: string) | Sets the selected date and updates the calendar | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| selected | When a date is selected | { selected: string } | onSelected | (detail: { selected: string }) => void |

### 5. Internal State
- State properties: `selected`, `value`
- Can be controlled externally: `selected` via prop; `value` is read-only output
- What event notifies change: `selected`
- Controlled vs uncontrolled: Partially controlled; `selected` can be set externally, but internal navigation changes it

### 6. Styling
- Inherits no base CSS; defines own styles with CSS variables.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host(.wired-disabled)`, `:host(.wired-rendered)`, `:host(:focus) path`, `.overlay`, `svg`, `.calendar path`, `.selected path`, `table`, `table:focus`, `td`, `th`, `td.disabled`, `td.dimmed`, `td.selected`, `td:not(.disabled):not(.selected):hover`, `.pointer`.
- CSS variables or parts: `--wired-calendar-color`, `--wired-calendar-selected-color`, `--wired-calendar-bg`, `--wired-calendar-disabled-color`, `--wired-calendar-dimmed-color`.
- Dynamic visual computation: Rough.js draws based on `elevation`.
- Classes added by code: `.wired-disabled`, `.wired-rendered`.
- Theming knobs: `elevation`, `disabled`, `initials`.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `window` in `connectedCallback`, `getBoundingClientRect()`, `navigator`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredCalendarProps {
  elevation?: number;
  selected?: string;
  firstdate?: string;
  lastdate?: string;
  locale?: string;
  disabled?: boolean;
  initials?: boolean;
  value?: { date: Date, text: string };
  format?: (d: Date) => string;
  className?: string;
  style?: React.CSSProperties;
  onSelected?: (detail: { selected: string }) => void;
  ref?: React.Ref<WiredCalendarElement>;
}
```
Ref → WiredCalendarElement
SSR: browser-only

### Proposed API Changes
None.