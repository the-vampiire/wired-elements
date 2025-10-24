## wired-video

### 1. Identity
- Tag: `wired-video`
- Class: `WiredVideo`
- Base: `WiredBase`
- Purpose: Sketch-style video player with controls.

### 2. Reactive Props
| Name | Type | Default | Reflect | Description | Expose | React Name |
|------|------|----------|----------|--------------|---------|-------------|
| src | string | '' | false | Video source URL | ✅ | src |
| autoplay | boolean | false | false | Autoplay | ✅ | autoplay |
| loop | boolean | false | false | Loop | ✅ | loop |
| muted | boolean | false | false | Muted | ✅ | muted |
| playsinline | boolean | false | false | Plays inline | ✅ | playsinline |

### 3. Methods
| Method | Purpose | Expose via ref |
|---------|----------|----------------|
| (none) | - | - |

### 4. Events
| Event | When Fired | Detail | React Prop | Signature |
|--------|-------------|---------|-------------|------------|
| (none) | - | - | - | - |

### 5. Internal State
- None; video playback managed internally.

### 6. Styling
- Inherits `BaseCSS`, adds video and controls styles.
- Visual state depends on playback state.
- Host can be styled via className or color; internal styles live in shadow DOM.
- Shadow DOM selectors: `:host`, `video`, `path`, `#controls`, `.layout.horizontal`, `.flex`, `wired-progress`, `wired-icon-button span`, `#timeDisplay`, `wired-slider`.
- CSS variables or parts: `--wired-video-highlight-color`.
- Dynamic visual computation: Rough.js draws rectangle border; controls use child components.
- Classes added by code: none.
- Theming knobs: none.
- External styling hooks: can apply to host.

### 7. SSR Notes
- Browser-only (uses `ResizeObserver` and `getBoundingClientRect()`).
- Must be lazy-loaded in Next with `ssr: false`.

### 8. React Wrapper Surface
```ts
interface WiredVideoProps {
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```
Ref → WiredVideoElement
SSR: browser-only

### Proposed API Changes
None.