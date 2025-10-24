# WIRED_ELEMENTS_ANALYSIS.md

## Purpose
This document defines the **protocol agents must follow** when analyzing each `wired-*` component within the **Wired Elements modernization project**.  
The goal is to generate a clear, consistent **interface document** per component that captures:
- Its structure and behavior (Lit + Rough.js origins)
- Public API (props, events, methods)
- Styling hooks and SSR constraints
- The React and Next.js wrapper surface specifications

> **IMPORTANT**: only process the `src/` dir, do not evaluate the `experimental/` dir at this time

These interface documents will later be used to:
1. Generate clean, typed React wrappers via `@lit/react`.
2. Produce Next.js-safe dynamic imports (`ssr: false`).
3. Establish unified styling and event conventions across all modernized components.

---

## Step-by-Step Protocol

### 1. Component Identity
For each component (e.g. `wired-button`, `wired-dialog`, `wired-combo`):
- **Tag name:** e.g. `"wired-button"`
- **Class name:** e.g. `WiredButton`
- **Base class:** e.g. `WiredBase`, `LitElement`
- **Purpose:** One-sentence description of what the component does or represents.

---

### 2. Reactive Props (Public Surface)
Inspect all `@property(...)` declarations.

For each:
- **Name:** property name (e.g. `elevation`)
- **Type:** TS primitive or union (`number`, `boolean`, `string`, etc.)
- **Default value:** value assigned in class
- **Reflect:** whether `{ reflect: true }` is set
- **Description:** what visual or behavioral aspect it controls
- **Expose as React prop:** `yes/no`
- **React name override:** if a rename is needed for clarity (`value` → `selectedValue`, etc.)

> Example  
> `@property({ type: Number }) elevation = 1;`  
> → name: `elevation`, type: number, default: 1, reflect: false, meaning: shadow depth (1–5), expose: yes

---

### 3. Imperative / Instance API
List all public instance methods **not** part of Lit lifecycle (`updated`, `connectedCallback`, etc.).

For each:
- **Method name**
- **Purpose / description**
- **Is it safe to call externally?**
- **Expose via ref:** `yes/no`

> Example  
> Method: `focus()` → focuses the internal `<button>` element → expose via ref: yes

---

### 4. Events / Custom Events
Search for calls to `fire(...)` or `fireEvent(...)`.

For each event:
- **Event name** (string)
- **When it fires**
- **`detail` structure** (shape of payload)
- **Expose as React callback:** `yes/no`
- **Proposed React prop name:** (`onSelected`, `onConfirm`, etc.)
- **Callback signature:** e.g. `(detail: { value: string }) => void`

> Example  
> Fires: `fire('selected', { value })` → `onSelected?: (detail: { value: string }) => void`

Native DOM events like `click`, `input`, and `change` **do not require explicit mapping**; React handles them automatically.

---

### 5. Internal State / Value Model
Determine whether the component behaves like a **form control** or has internal state.

If yes:
- **State property name(s):** e.g. `value`, `checked`, `open`
- **Can it be controlled externally?** (reactive property or internal only?)
- **What event notifies change?**
- **Controlled vs uncontrolled** (decide later; just record current behavior)

> Example  
> `wired-combo`  
> - property: `value`  
> - fires: `selected` event  
> - current model: uncontrolled, value only changed internally

---

### 6. Styling Hooks and Behavior
Summarize style information from `static get styles()` and any inherited bases (`BaseCSS`).

Include:
- **Shadow DOM selectors:** does it use `:host`, internal `<div>`, `#overlay`, etc.?
- **CSS variables or parts:** if any
- **Dynamic visual computation:** (e.g. Rough.js draws based on `elevation`)
- **Classes added by code:** like `.wired-rendered`
- **Theming knobs:** props that change visuals (e.g. `elevation`, `disabled`, `modal`)
- **External styling hooks:** can the consumer safely apply Tailwind classes to host?

Agents should not rewrite CSS, only document **where and how styling occurs**, and note potential **theme extension points** (e.g. adding `variant`, `tone`, `size`).

---

### 7. SSR / Browser-Only Notes
Mark whether the component **depends on DOM APIs at load or render**.

Look for:
- `window`, `document`, `SVGSVGElement`, `getBoundingClientRect()`, `ResizeObserver`
- Rough.js drawing calls during render
- `customElements.define()` executed at module scope

If any are found:
- Mark as **Browser-only**
- Require `dynamic(..., { ssr: false })` in Next.js
- Include reason (e.g. “Uses ResizeObserver in constructor”)

---

### 8. Proposed React Wrapper Surface
Design the **ideal React contract** for the component based on the above.

Include:
- **React component name:** e.g. `WiredButton`
- **Props interface:** only include meaningful public props and React standards (`className`, `style`, `children`, `onClick`, etc.)
- **Event callbacks:** any mapped custom events
- **Ref type:** e.g. `WiredButtonElement`
- **SSR constraint:** safe in plain React; Next.js must import from `/next`
- **Notes:** controlled/uncontrolled, event semantics, etc.

> Example:

```ts
// React surface
interface WiredButtonProps {
  elevation?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
```

ref -> WiredButtonElement
SSR: browser-only; requires dynamic import in Next

### 9. Output Format Example

Each interface document should follow this Markdown template:

## wired-button

### 1. Identity
- Tag: `wired-button`
- Class: `WiredButton`
- Base: `WiredBase`
- Purpose: Sketch-style button with rough SVG border and drop shadow.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| elevation | number | 1 | false | Shadow depth (1–5) | ✅ | elevation |
| disabled | boolean | false | true | Disables interaction | ✅ | disabled |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| focus() | Focuses internal button | ✅ |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; visual-only component.

### 6. Styling
- Inherits `BaseCSS`, adds shadow and transition styles.
- Visual depth depends on `elevation`.
- Host can be styled via className or color; internal styles live in shadow DOM.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredButtonProps {
  elevation?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
```
Ref → WiredButtonElement
SSR: browser-only

---

## Summary

**Agents must:**
1. Parse each `wired-*` source file.
2. Extract all reactive props, methods, and events.
3. Summarize styling, SSR constraints, and internal behaviors.
4. Output a Markdown interface document matching the above template.
5. Ensure language is descriptive but concise, suitable for automated wrapper generation later.

Once every component has an interface document, the next phase (wrapper generation) can proceed automatically using these specs as input.

---