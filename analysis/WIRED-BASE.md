## wired-base

### 1. Identity
- Tag: N/A (abstract base class)
- Class: `WiredBase`
- Base: `LitElement`
- Purpose: Abstract base class providing shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing for all wired-* components.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| (none) | - | - | - | - | - | - |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| wiredRender(force?: boolean) | Triggers redraw of SVG sketch if size changed or forced | No |
| fire(name: string, detail?: any) | Dispatches custom event with composed and bubbling | No |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- State properties: `lastSize` (cached canvas size), `seed` (random seed for Rough.js)
- Can be controlled externally: No
- What event notifies change: None
- Controlled vs uncontrolled: N/A

### 6. Styling
- Defines `BaseCSS` with fade-in opacity, overlay positioning, SVG display, and path stroke using `currentColor`.
- Visual state depends on `.wired-rendered` class for opacity transition.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `:host(.wired-rendered)`, `#overlay`, `svg`, `path`, `.hidden`.
- CSS variables or parts: none.
- Dynamic visual computation: None; provides abstract `draw` method for subclasses.
- Classes added by code: `.wired-rendered`.
- Theming knobs: `currentColor` for stroke.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Base class itself is SSR-safe (no DOM APIs).
- Subclasses typically browser-only due to `getBoundingClientRect()`, `ResizeObserver`, and Rough.js drawing.

### 8. React Wrapper Surface
N/A (abstract base)

### Proposed API Changes
None.