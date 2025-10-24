# Wired Elements Analysis Index

This file tracks the progress of analyzing each wired-* component for React wrapper generation.

| Component | Status | Notes |
|------------|---------|--------|
| wired-base | ✅ | Abstract base. Controls redraw, theming via currentColor, browser-only subclasses |
| wired-button | ✅ | Visual-only component; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-calendar | ✅ | Has internal value state, emits 'selected'; SSR-unsafe: window, getBoundingClientRect, navigator |
| wired-card | ✅ | Visual-only container; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-checkbox | ✅ | Form control with checked state, emits 'change'; SSR-unsafe: ResizeObserver |
| wired-combo | ✅ | Dropdown with selected state, emits 'selected'; SSR-unsafe: getBoundingClientRect |
| wired-dialog | ✅ | Modal with open state; SSR-unsafe: wired-card uses ResizeObserver |
| wired-divider | ✅ | Visual-only divider; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-fab | ✅ | Visual-only FAB; SSR-unsafe: getBoundingClientRect |
| wired-icon-button | ✅ | Visual-only icon button; SSR-unsafe: getBoundingClientRect |
| wired-image | ✅ | Visual-only image container; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-input | ✅ | Form control with value state, emits 'change', 'input'; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-item | ✅ | Selectable list item; SSR-unsafe: getBoundingClientRect |
| wired-link | ✅ | Visual-only link; SSR-unsafe: getBoundingClientRect |
| wired-listbox | ✅ | List container with selected state, emits 'selected'; SSR-unsafe: getBoundingClientRect |
| wired-progress-ring | ✅ | Progress indicator with value state; SSR-unsafe: getBoundingClientRect |
| wired-progress | ✅ | Progress bar with value state; SSR-unsafe: getBoundingClientRect |
| wired-radio-group | ✅ | Radio group with selected state, emits 'selected'; SSR-safe |
| wired-radio | ✅ | Radio button with checked state, emits 'change'; SSR-unsafe: ResizeObserver |
| wired-search-input | ✅ | Search input with value state, emits 'change', 'input'; SSR-unsafe: getBoundingClientRect |
| wired-slider | ✅ | Slider with value state, emits 'change'; SSR-unsafe: getBoundingClientRect |
| wired-spinner | ✅ | Animated spinner; SSR-unsafe: requestAnimationFrame |
| wired-tab | ✅ | Tab item; SSR-unsafe: ResizeObserver, getBoundingClientRect |
| wired-tabs | ✅ | Tabs container with selected state; SSR-unsafe: requestAnimationFrame |
| wired-textarea | ✅ | Textarea with value state, emits 'change', 'input'; SSR-unsafe: getBoundingClientRect |
| wired-toggle | ✅ | Toggle switch with checked state, emits 'change'; SSR-unsafe: ResizeObserver |
| wired-video | ✅ | Video player with controls; SSR-unsafe: ResizeObserver, getBoundingClientRect |