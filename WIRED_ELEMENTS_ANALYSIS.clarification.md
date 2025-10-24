Your agent is doing real engineering work, not vibes. Excellent.

Let’s tighten the protocol with explicit rules so two different agents produce the same spec. After each clarification I’ll show how that affects WIRED_ELEMENTS_ANALYSIS.md so you can update the doc.

I’ll refer to a couple components:
	•	wired-button (simple visual button)
	•	wired-dialog (imperative show/hide)
	•	wired-combo (stateful selectable list)

	1.	Criteria for exposing props / methods / events

Rule for props (“Expose as React prop?”):
Say yes if:
	•	It’s declared with @property(...) on the LitElement subclass, AND
	•	It is intended to be controlled by consumers, not just internal wiring.

Heuristics:
	•	If the property name makes sense to a consumer (e.g. disabled, elevation, open, value, checked) → yes.
	•	If it’s clearly an internal knob for layout/measurement/optimization (e.g. lastSize, seed, roAttached) → no.
	•	If changing it will reasonably change visual state or behavior the consumer cares about → yes.
	•	If changing it will corrupt internal bookkeeping or break redraw logic → no.

Rule for methods (“Expose via ref?”):
Say yes if:
	•	The method is meant to be called externally to cause a meaningful, user-facing effect.
	•	Examples:
	•	focus() on wired-button focuses the internal button → yes.
	•	show() / close() / layout() on wired-dialog to open/close → yes.
	•	The method is idempotent and won’t desync internal assumptions if called unexpectedly (i.e. it’s user-safe).

Say no if:
	•	The method is an internal lifecycle hook (updated, disconnectedCallback, wiredRender).
	•	The method only exists to update internal rendering or geometry and is normally called from lifecycle. Calling it manually might break timing or cause redundant work.
	•	Example: wiredRender(force?) in WiredBase is called after resizing, and relies on this.svg being ready. That’s internal plumbing, not public API. Mark “Expose via ref: no.”

Rule for events (“Expose as React callback?”):
Say yes if:
	•	The component calls fire(...) or fireEvent(...) to emit a semantic event upward (selection, confirm, cancel, change).
	•	The event represents something app-level logic will care about.
	•	Example: this.fire('selected', { value }) in a combo box → should surface as onSelected.

Say no if:
	•	The event is fired purely for internal lifecycles, sizing, redraw, etc.
	•	The event is redundant with native DOM events React already gets (click, input, etc.) and doesn’t carry new meaning.

This becomes formal criteria you can drop into the protocol.
	2.	React name overrides: when to rename props

Why you’d rename:
	•	Clarity to the consumer (avoid vague names that only make sense in the original implementation).
	•	Consistency across all wrappers.
	•	Avoiding collisions with React-reserved patterns.

Rules:
Keep the original name if:
	•	It already matches what React devs expect for that behavior.
	•	disabled stays disabled.
	•	open on a dialog stays open.
	•	elevation can stay elevation because it’s descriptive.

Rename if:
	•	The name is too generic to stand on its own across the design system.
	•	Example: in wired-combo, if the Lit component calls its selected item value, that’s ambiguous in React land unless we’re treating the component as a form control. You might rename to selectedValue or value depending on how you plan to expose it.
	•	The existing prop name collides with a React DOM prop in a way that changes meaning.
	•	For instance, if a component uses class as a reactive property (rare but possible), you’d expose it as className.
	•	The component exposes something like target that is not an event target but instead means “anchor element”. That should be renamed (anchorEl etc.).

So the rule for agents is:
	•	For each @property, ask: would a React dev understand this name in isolation, without reading source?
	•	If yes, React Name = same name.
	•	If no, propose a clearer React Name and explain the rename in the spec table.

Have the agent propose, but not enforce. We’ll confirm later when generating wrappers.
	3.	Method safety: what makes a method NOT safe to expose

Unsafe methods are ones that:
	•	Assume a particular lifecycle phase. For example, wiredRender() assumes:
	•	this.svg exists in the shadow DOM,
	•	layout has been measured,
	•	size data is valid.
Calling wiredRender() too early or too often could cause inconsistencies, throw errors, or trigger expensive redraw loops.
	•	Are part of Lit’s internal lifecycle (updated, disconnectedCallback, connectedCallback). Never expose those.
	•	Are explicitly cleanup/setup helpers (like attachResizeListener, detachResizeListener). Those are coupled to observer bookkeeping. Exposing them to React invites memory leaks or double-observation.

Safe methods:
	•	Are obviously user-intent-y.
	•	focus()
	•	show(), close(), toggle()
	•	confirm(), cancel() if they map to visible dialog behavior

So the rule for agents:
Mark method as “unsafe” and do NOT expose via ref if:
	•	It’s about rendering internals, measurement, resize listeners, mutation of the drawing surface, or Lit lifecycle.
	•	It was not clearly intended as an external control surface (nobody expects a normal button API to include wiredRender(true)).

Mark “safe, expose via ref” if:
	•	It sounds like something a consumer might reasonably call in app code.
	•	It affects visible state or focus.

	4.	Native DOM events with custom detail

This is a good edge case.

Two possibilities:

A) The component uses native DOM events (like click) and does NOT manually wrap them. That’s normal. React can already listen to onClick.

B) The component dispatches its own CustomEvent('selected', { detail: ... }). That is not a native DOM event. That requires mapping and becomes onSelected.

C) The component fires a custom event using a native-ish name. For example, it might call fire('change', { value }) instead of firing the platform’s normal change event. Now we have ambiguity:
	•	React will attach an onChange, but React’s synthetic event will not include the detail payload from your CustomEvent.
	•	We DO need to expose that as a mapped callback.

So the rule for agents:
	•	If it uses fire or fireEvent, treat it as a custom event, even if the event name is something like 'change', 'input', etc.
	•	Extract the payload shape from detail.
	•	Propose a React callback like onChange or onSelected, and document the payload type.
	•	If it’s a pure built-in bubbling event (click/focus/input/change) that is NOT re-fired with fire(...), you can assume React can catch it without special mapping.

In other words: “Was it fired by fire()? Then treat it as custom and document it.”
	5.	Controlled vs uncontrolled state: what to record

This part informs future wrapper decisions (do we expose <WiredCombo value=... onValueChange=...> like a normal controlled React component, or do we just expose a simple onSelected callback and let it manage its own state?).

Agents should record:
	•	Does the component track internal state that represents user selection / visibility / value?
	•	Examples:
	•	wired-combo may internally store which item is selected.
	•	wired-dialog may internally track whether it’s open.
	•	Is that state exposed as an @property (reactive prop)? If yes, that means we can control it externally. Write that down.
	•	e.g. @property({type: Boolean, reflect: true}) open = false
	•	Does the component mutate that property itself in its own code (uncontrolled behavior)?
	•	e.g. it sets this.open = true; internally when show() is called.
	•	Does it emit an event when it changes that state? Name that event and payload.

Agents should capture these four bullets per component:
	•	Internal state keys: (open, value, etc.)
	•	How that state is changed (internally only? can parent set it?)
	•	Whether parent can force it by setting the property
	•	Which event(s) notify parent of changes

That’s all the data React wrapper generation will need to decide if we implement controlled props, uncontrolled props with callbacks, or both.
	6.	Theming extensions: how far should speculation go?

We do want the agent to mark possible theming knobs, but we don’t want wild invention.

Rule:
	•	If a component’s CSS or behavior strongly implies a semantic role (e.g. “primary action button”, “danger button”, “modal backdrop strength”), note that.
	•	If the component already has visual parameters (like elevation) or obvious style constants (padding, uppercase text, shadow thickness), note those too.
	•	If you see repeated patterns across components (e.g. many components hard-code font-size: 14px; text-transform: uppercase; padding: 10px;), flag that as “global style hook candidate.”
	•	Do NOT invent brand palettes or arbitrary tokens by yourself. Just note the opportunity.

Example for wired-button:
	•	Styles force uppercase text, fixed padding, and a hand-drawn border with variable “depth.” That implies candidates:
	•	size (sm/md/lg padding, font-size)
	•	variant (normal vs. ghost vs. danger)
	•	tone (color via currentColor)
	•	Agent should list: “Potential theme knobs: size, variant, tone; currently NOT implemented.”

This gives us data for system-level theming later.
	7.	SSR detection: what else marks a component browser-only?

Besides explicit DOM globals (window, document, SVGSVGElement, ResizeObserver, getBoundingClientRect), also treat a component as browser-only if:
	•	It queries layout or bounding boxes (getBoundingClientRect(), offsetWidth, etc.) anywhere in the constructor, updated(), or any method that runs automatically during first render. Those APIs require real DOM elements.
	•	It draws using roughjs into <svg> or <canvas> during or immediately after render. roughjs is very DOM-leaning. If the drawing code runs automatically at startup (which it does with wiredRender() inside updated()), that means SSR cannot simulate it. Mark browser-only.
	•	It registers a ResizeObserver, MutationObserver, etc. in the constructor or connectedCallback.
	•	It assumes CSS is applied and readable during layout to compute sizes dynamically before first paint.

So the SSR rule the agent should apply:
If any of the following happens automatically (without waiting for an explicit method call from the outside world):
	•	DOM measurement
	•	DOM mutation that relies on browser layout info
	•	global browser objects (window/document/customElements registry)
	•	roughjs drawing logic into actual SVG nodes

then mark:
	•	SSR: browser-only (needs dynamic import with ssr:false in Next.js)
	•	list which behaviors triggered that classification.

Now we update the protocol doc with these clarifications.

Revised additions to WIRED_ELEMENTS_ANALYSIS.md:
	1.	Under “Reactive Props (Public Surface)”:
Add:

	•	Expose as React prop = “yes” if the property is declared with @property(...), controls visible state or behavior that a normal consumer would reasonably want to set, and is not purely bookkeeping. Expose = “no” for internal bookkeeping or lifecycle helpers.

Add the renaming rules:
	•	Keep the same name unless it’s confusing in React land or collides with common React semantics.
	•	If rename is proposed, document both names and the reason.

	2.	Under “Imperative / Instance API”:
Add:

	•	Expose via ref = “yes” if calling this method is a normal UI control action (focus(), show(), close(), etc.).
	•	Expose via ref = “no” if the method:
	•	is lifecycle/internal (updated, wiredRender, attachResizeListener, etc.)
	•	assumes DOM state that may not exist yet if called arbitrarily
	•	mutates internal observers or rendering surfaces

	3.	Under “Events / Custom Events”:
Add:

	•	Treat any event fired via fire(...) / fireEvent(...) as custom, even if its name sounds native (e.g. "change"). These need to be documented and mapped to React callback props.
	•	Native browser events like click do not need mapping unless this component reimplements them via fire() with a custom detail.

	4.	Under “Internal State / Value Model”:
Add bullet points agents must record:

	•	Internal state keys managed by the element (e.g. open, value).
	•	Whether those stateful keys are exposed as reactive properties (parent can set them).
	•	Whether the component mutates them internally (uncontrolled behavior).
	•	Which events fire when they change (notification path up to React).
	•	Whether this looks like a form control (select, input, checkbox) or a display/control surface (dialog, tooltip, toast).

	5.	Under “Styling Hooks and Behavior”:
Add:

	•	Agents should document:
	•	What’s hard-coded (padding, font-size, uppercase).
	•	Whether visuals depend on reactive props (like elevation).
	•	Any repeated styling patterns that look like they should become global tokens (size, tone, variant).
	•	But agents should not invent new tokens. They should label them as “Potential theme knobs: … (not yet implemented).”

	6.	Under “SSR / Browser-Only Notes”:
Add:

	•	Mark browser-only if the component:
	•	touches window, document, customElements in constructor or at module init,
	•	measures layout (getBoundingClientRect, offsetWidth) during updated() or first render,
	•	instantiates observers like ResizeObserver,
	•	draws via roughjs into DOM immediately.
	•	Otherwise, if it appears safe (rare in this library, but possible for something very static), mark it as “likely SSR-safe”.

That’s enough structure that:
	•	The agent knows what to extract.
	•	You get consistent per-component docs.
	•	Wrapper codegen can be automated.