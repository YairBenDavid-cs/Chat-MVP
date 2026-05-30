# next-step

Identify and implement the next incomplete step in this project's build plan.

## Instructions

1. **Read all four reference files** in full before doing anything else:
   - `TODO.md` — the phase-by-phase build plan with a progress tracker
   - `CLAUDE.md` — absolute coding rules (no nested JSX, no `any`, explicit return types, etc.)
   - `architecture.md` — the full file tree and project structure
   - `projectConstrains.md` — acceptance criteria

2. **Detect what's already done** by scanning the `## Progress Tracker` section in `TODO.md`
   for the first unchecked phase (`- [ ]`), plan how to implment it and do so.

3. **Announce clearly** before writing any code:
   - Which phase number you are implementing
   - Which file(s) will be created or modified
   - A one-sentence explanation of why this phase step comes next

4. **Implement the step exactly** as described in `TODO.md`, following every rule in `CLAUDE.md`:
   - No nested JSX — every `return` uses only `<ComponentName />` references
   - No `any` — all types must be explicit
   - Explicit return types on every function, hook, and component
   - Named `Props` interface above every component
   - Flat, short `return` blocks (≤ 10 lines)
   - One concern per file; split if a file exceeds ~100 lines of logic

5. **After writing all files**, run `npx tsc --noEmit` and show the output.
   - If there are errors, fix them before finishing — do not leave TypeScript debt.

6. **Report completion**: list every file created or modified, confirm `tsc` passes,
   and state the next step number so the user knows what comes after.
