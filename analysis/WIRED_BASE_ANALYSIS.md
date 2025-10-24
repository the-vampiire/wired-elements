# analysis/BASE_INTEGRATION_TASK.md

## Mission
You will:
1. Analyze the abstract base class `wired-base` in `src/`.
2. Generate a new analysis file called `analysis/WIRED-BASE.md` that documents shared behavior inherited by all wired-* components.
3. Update `analysis/INDEX.md` to include `wired-base`.
4. For every existing component analysis file (e.g. `analysis/WIRED-BUTTON.md`, `analysis/WIRED-COMBO.md`, `analysis/WIRED-DIALOG.md`, etc.), append/patch specific sections to acknowledge inheritance from `wired-base`.

You must follow the style, rigor, and conventions defined in `analysis/ELEMENTS_ANALYSIS.md`. You must also preserve each component file’s current content and only add the required patches (do not rewrite or reorder their sections).

Context resets between tasks are allowed. You must refer to `analysis/ELEMENTS_ANALYSIS.md` as the canonical protocol.

---

## Part 1. Analyze `wired-base`

### 1. Locate and read the source
Open `src/wired-base.ts` (not `experimental/`). Extract:
- The `WiredBase` class definition.
- The exported `BaseCSS`.
- The shared helper functions like `fireEvent`.
- Any lifecycle methods it defines or overrides (`updated`, etc.).
- Any rendering logic (`wiredRender`).
- Any abstract requirements it imposes on subclasses (`canvasSize`, `draw`).
- Any DOM usage (ResizeObserver, getBoundingClientRect, SVG updates).

### 2. Create a new file: `analysis/WIRED-BASE.md`
(Use the template and sections exactly as described earlier.)

### 3. Save the file
Write the file to the repo as `analysis/WIRED-BASE.md`.

---

## Part 2. Update analysis/INDEX.md

1. Add (or update) an entry for `wired-base` at the top of the index table.
2. Mark its status as ✅ Complete after generating `analysis/WIRED-BASE.md`.
3. Add a short note about why it’s special.

Example row to add or update:

| Component      | Status | Notes                                                                 |
|----------------|--------|-----------------------------------------------------------------------|
| wired-base     | ✅     | Abstract base. Controls redraw, theming via currentColor, browser-only|

---

## Part 3. Patch all existing component analysis files

### Patch A. Identity section
Add:
- Inherits from: `WiredBase` (see `analysis/WIRED-BASE.md`). `WiredBase` supplies the shared rough-style rendering pipeline, fade-in behavior, and custom event plumbing.

### Patch B. Styling section
Append:
- Includes `BaseCSS` from `wired-base`, unless otherwise noted... (full paragraph per prior description).

### Patch C. SSR Notes section
Append standardized SSR line about browser-only redraw lifecycle inherited from WiredBase.

### Patch D. React Wrapper Surface section
Ensure the interface includes `ref?: React.Ref<UnderlyingElementType>` when applicable.

---

## Part 4. Verification
Confirm:
1. `analysis/WIRED-BASE.md` exists and follows structure.
2. Index includes wired-base row ✅.
3. Each component mentions inheritance, BaseCSS, SSR browser-only line, and `ref`.

---

## Part 5. Output
After performing all steps, save all modified files.

---
