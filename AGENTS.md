# Repository Guidelines

## Project Overview

**SillyTavern-Collection-Tools** is a SillyTavern browser extension providing macros and slash commands for list and dictionary manipulation. It extends SillyTavern's scripting capabilities via the STLibs-Nox-Library dependency, offering operations like push/pop, index-of, sorting, slicing, and dictionary key/value enumeration.

- **License**: AGPL-3.0
- **Version**: 1.2.0-alpha
- **Author**: CasualAutopsy

## Architecture & Data Flow

### Three-Layer Modular Registration

```
main.js
  └── core/index.js          ← Bootstrap: registers all cmds + macros
        ├── cmds/index.js    ← Delegates to lists/dicts/collections
        │     ├── lists/*-cmds.js    ← /list-* slash command registration
        │     ├── dicts/*-cmds.js    ← /dict-* slash command registration
        │     └── collections/index.js ← Stub (future)
        │
        └── macros/index.js  ← Delegates to lists/dicts/collections
              ├── lists/*-macros.js  ← Macro registration (listIndex, listPush, etc.)
              ├── dicts/*-macros.js  ← Macro registration (getDictKeys, etc.)
              └── collections/index.js ← Stub (future)
```

### Execution Pattern

Each feature follows a consistent two-file pattern:

1. **`*-cmds.js` / `*-macros.js`** — Registration layer: calls `SlashCommandParser.addCommandObject()` or `macros.register()` with command metadata
2. **`*-callbacks.js` / `*-handlers.js`** — Implementation layer: async callback functions that perform the actual work

Operations are organized by **data type** (lists, dicts, collections) and **operation category**:

| Category | Lists | Dicts | Collections |
|----------|-------|-------|-------------|
| **Enum** (read keys/entries) | `listIndex`, `listEntries` | `getDictKeys`, `getDictValues`, `getDictEntries` | — |
| **Mut** (in-place mutation) | `listPush`, `listPop`, `listUnshift`, `listShift`, `listSplice`, `listFill`, `listCopyWithin`, `listSort`, `listReverse` | — | — |
| **Search** (index/find) | `listAt`, `listIndexOf`, `listLastIndexOf` | — | — |
| **Test** (predicate) | `listIncludes`, `listEvery`, `listSome` | — | — |
| **Trans** (immutable transform) | `listSlice`, `listConcat`, `listFlat` | `dictFromEntries` | — |

### Integration Layer

`src/external/` re-exports SillyTavern runtime APIs:
- **`st-context.js`** — Static access to `SillyTavern.getContext()` values
- **`st-public.js`** — Dynamic import for closure types at runtime

### External Dependency

The extension requires `STLibs-Nox-Library` (declared in `manifest.json` as a hard dependency). All argument parsing delegates to `NoxLib.MacroHandlers.argHandler`.

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/core/` | Active extension code: registration + handlers/callbacks |
| `src/core/macros/` | STScript macro definitions and handlers |
| `src/core/cmds/` | Slash command definitions and async callbacks |
| `src/external/` | SillyTavern runtime API wrappers |
| `src/__deprecated__/` | Legacy command docs (HTML help text, STScript examples) |
| `tests/` | Jest test suite mirroring `src/core/` structure |
| `dist/` | Build output (`main.bundled.js`) |

## Development Commands

```bash
# Build production bundle
npm run build

# Run tests (verbose)
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

## Code Conventions & Common Patterns

### Language & Module System
- **Pure JavaScript** (no TypeScript compilation). ESM throughout (`"type": "module"` in package.json).
- No linter or formatter configured.
- Babel transpiles via `@babel/preset-env` only.

### Naming Conventions
- **Files**: kebab-case (`mut-handlers.js`, `search-cmds.js`)
- **Functions**: camelCase (`listIndexHandler`, `fromEntriesCallback`)
- **Slash commands**: kebab-case (`/list-index`, `/dict-get-keys`)
- **Macros**: camelCase with prefix (`listIndex`, `listPush`, `getDictKeys`)

### Error Handling
- Handlers use `console.error()` for validation failures (e.g., wrong datatype, missing arguments).
- Tests verify error paths via `jest.spyOn(console, 'error').mockImplementation()`.

### Async Patterns
- **Slash command callbacks** are `async` functions returning results to SillyTavern's command parser.
- **Macro handlers** are synchronous, returning values directly.
- Closure-based predicates used in search/test operations (e.g., `search-callbacks.js` captures callback refs).

### Variable Persistence
- Mutation operations use `parseMut` to persist variable changes across SillyTavern's variable scope (local/global Maps).
- Test setup (`tests/setup.js`) provides `resetVariables()` and `_scope` helpers for this.

### Registration Pattern
```javascript
// cmds: SlashCommandParser.addCommandObject(SlashCommand.fromProps({...}))
// macros: macros.register({ name, handler })
```

## Important Files

| File | Role |
|------|------|
| `src/main.js` | Entry point — calls `initExt()` |
| `src/core/index.js` | Bootstrap — wires up all commands and macros |
| `manifest.json` | SillyTavern extension manifest (loading_order: 2, depends on Nox Library) |
| `package.json` | NPM manifest, scripts, dependencies |
| `webpack.config.js` | Webpack 5 build config (Babel + Terser) |
| `jest.config.js` | Jest config (100% coverage threshold on handlers) |
| `tests/setup.js` | Test environment: mocks `globalThis.SillyTavern`, imports NoxLib |
| `global.d.ts` | Ambient type declarations for NoxLib types |

## Runtime/Tooling Preferences

- **Runtime**: Node.js (for build/test); runs in browser (SillyTavern) at runtime
- **Package manager**: npm (no lock file in repo — check for `package-lock.json`)
- **Module system**: ESM only (`"type": "module"`)
- **Bundler**: Webpack 5 → `dist/main.bundled.js`
- **Transpiler**: Babel with `@babel/preset-env`
- **Minifier**: Terser (comments stripped)
- **Test environment**: Jest v30 with `--experimental-vm-modules` (ESM support)
- **No TypeScript compilation** — `global.d.ts` is ambient-only for editor support

## Testing & QA

### Framework
- **Jest v30.5.1** with ESM via `NODE_OPTIONS='--experimental-vm-modules'`
- Test environment: `node` (not `happy-dom` — happy-dom is a devDependency but not used in jest.config)

### Test Structure
Tests mirror `src/core/` under `tests/core/`:
```
tests/core/
  ├── macros/
  │     ├── lists/
  │     │     ├── mut-handlers.test.js    ← Fully implemented (9 handlers)
  │     │     ├── enum-handlers.test.js   ← TODO stub
  │     │     ├── search-handlers.test.js ← TODO stub
  │     │     ├── trans-handlers.test.js  ← TODO stub
  │     │     └── test-handlers.test.js   ← TODO stub
  │     └── dicts/
  │           ├── enum-handlers.test.js   ← TODO stub
  │           └── trans-handlers.test.js  ← TODO stub
  └── cmds/
        ├── lists/
        │     ├── enum-callbacks.test.js  ← TODO stub
        │     ├── mut-callbacks.test.js   ← TODO stub
        │     ├── search-callbacks.test.js← TODO stub
        │     ├── test-callbacks.test.js  ← TODO stub
        │     └── trans-callbacks.test.js ← TODO stub
        └── dicts/
              ├── enum-callbacks.test.js  ← TODO stub
              └── trans-callbacks.test.js ← TODO stub
```

### Coverage Thresholds
- **Functions/Lines/Statements**: 100%
- **Branches**: 80%
- **Scope**: `src/core/**/*.js` excluding `index.js`, `*-cmds.js`, `*-macros.js` (only handler/callback files)

### Test Patterns
- `describe`/`test` blocks organized by concern: return values, console errors, datatype parsing, shorthand variables
- `beforeEach`/`afterEach` for cleanup via `resetVariables()`
- No CI configuration exists — tests run locally only
