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

## Output Structure

Agents must output each analyzed component as a **separate file** in `analysis/` named:

[TAGNAME].md

Example: `WIRED-BUTTON.md`, `WIRED-DIALOG.md`

Additionally, an **index checklist file** named `INDEX.md` must be maintained.  
It lists all discovered components and tracks progress for each (✅ analyzed / ⏳ pending / 🚫 skipped).

Example:

| Component | Status | Notes |
|------------|---------|--------|
| wired-button | ✅ | Complete |
| wired-dialog | ⏳ | In progress |
| wired-combo | 🚫 | Not started |

---

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

> Agents must infer the **Type** directly in TypeScript syntax (`number`, `boolean`, etc.) based on `{ type: Number }` declarations.  
> Do not preserve the Lit form `{ type: Number }`; always normalize to TS types for downstream code generation.

- **Default value:** value assigned in class
- **Reflect:** whether `{ reflect: true }` is set
- **Description:** what visual or behavioral aspect it controls
- **Expose as React prop:** `yes/no`
- **React name override:** if a rename is needed for clarity (`value` → `selectedValue`, etc.)

> Example  
> `@property({ type: Number }) elevation = 1;`  
> → name: `elevation`, type: number, default: 1, reflect: false, meaning: shadow depth (1–5), expose: yes

•	Expose as React prop = “yes” if the property is declared with @property(...), controls visible state or behavior that a normal consumer would reasonably want to set, and is not purely bookkeeping. Expose = “no” for internal bookkeeping or lifecycle helpers.

•	Keep the same name unless it’s confusing in React land or collides with common React semantics.
•	If rename is proposed, document both names and the reason.

> If a rename is proposed (e.g., `value` → `selectedValue`), record it in both:
> - the **Reactive Props table** (React Name column), and  
> - a new section titled **“Proposed API Changes”** at the bottom of the file, listing all renames with reasoning.
>
> Example entry:
> - Rename `value` → `selectedValue`: improves clarity; avoids collision with native input value semantics.

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

•	Expose via ref = “yes” if calling this method is a normal UI control action (focus(), show(), close(), etc.).
•	Expose via ref = “no” if the method:
	•	is lifecycle/internal (updated, wiredRender, attachResizeListener, etc.)
	•	assumes DOM state that may not exist yet if called arbitrarily
	•	mutates internal observers or rendering surfaces

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

•	Treat any event fired via fire(...) / fireEvent(...) as custom, even if its name sounds native (e.g. "change"). These need to be documented and mapped to React callback props.
•	Native browser events like click do not need mapping unless this component reimplements them via fire() with a custom detail.

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

•	Internal state keys managed by the element (e.g. open, value).
•	Whether those stateful keys are exposed as reactive properties (parent can set them).
•	Whether the component mutates them internally (uncontrolled behavior).
•	Which events fire when they change (notification path up to React).
•	Whether this looks like a form control (select, input, checkbox) or a display/control surface (dialog, tooltip, toast).

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

•	Agents should document:
	•	What’s hard-coded (padding, font-size, uppercase).
	•	Whether visuals depend on reactive props (like elevation).
	•	Any repeated styling patterns that look like they should become global tokens (size, tone, variant).
	•	But agents should not invent new tokens. They should label them as “Potential theme knobs: … (not yet implemented).”

Agents should not rewrite CSS, only document **where and how styling occurs**, and note potential **theme extension points** (e.g. adding `variant`, `tone`, `size`).

---

### 7. SSR / Browser-Only Notes
Mark whether the component **depends on DOM APIs at load or render**.

Look for:
- `window`, `document`, `SVGSVGElement`, `getBoundingClientRect()`, `ResizeObserver`
- Rough.js drawing calls during render
- `customElements.define()` executed at module scope

•	Mark browser-only if the component:
	•	touches window, document, customElements in constructor or at module init,
	•	measures layout (getBoundingClientRect, offsetWidth) during updated() or first render,
	•	instantiates observers like ResizeObserver,
	•	draws via roughjs into DOM immediately.
•	Otherwise, if it appears safe (rare in this library, but possible for something very static), mark it as “likely SSR-safe”.

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

### Consistency Rules

- Each component = one markdown file in the format `WIRED_[TAGNAME].md`.
- All types must be written in TypeScript syntax, not Lit declaration syntax.
- Any proposed renames or API shape adjustments must also appear in a “Proposed API Changes” table within that component’s markdown.
- The global index (`WIRED_ELEMENTS_INDEX.md`) must be updated after every successful component analysis.

---

### Consistency Rules

- Each component = one markdown file in the format `WIRED_[TAGNAME].md`.
- All types must be written in TypeScript syntax, not Lit declaration syntax.
- Any proposed renames or API shape adjustments must also appear in a “Proposed API Changes” table within that component’s markdown.
- The global index (`WIRED_ELEMENTS_INDEX.md`) must be updated after every successful component analysis.

---