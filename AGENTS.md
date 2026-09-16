# Repository Guidelines

## Project Overview

**Collection Tools** is a SillyTavern browser extension providing macros and slash commands for list and dictionary operations. It depends on [STLibs-Nox-Library](https://github.com/CasualAutopsy/STLibs-Nox-Library) for its argument parsing and variable scope resolution.

- **Runtime**: Browser (SillyTavern extension), bundled for client-side execution
- **Module system**: ESM (`"type": "module"`)
- **Package manager**: npm
- **Current version**: `1.0.0-alpha`

## Agent Constraints

- **Source code is read-only.** Agents MUST NOT modify any file under `./src/`. All work is confined to `tests/` test spec files (`*.test.js`) only.
- **Test infrastructure is locked.** Agents MUST NOT modify `tests/setup.js`, `jest.config.js`, `webpack.config.js`, or any other test configuration/script files unless given explicit permission by the user.
- **Primary focus: test suite coverage.** Write, expand, and maintain Jest tests to reach the stated coverage thresholds (80% branches, 100% functions/lines/statements on `src/core/**/*.js`).
- **Missing NoxLib mocks.** If a test requires a NoxLib method that is not mocked in `tests/setup.js`, STOP and report it to the user. Request the relevant code snippet from the real NoxLib source and explicit permission to add the mock to the test setup.
- **Build/deploy is off-limits.** Agents MUST NOT run `npm run build`, `npm run test:cov`, or any command that produces production artifacts. Only `npm test` and `npm run test:watch` are permitted.
- **Study existing tests first.** Before writing any new test file, review existing test files in the same domain for mocking patterns, scope helpers, and assertion style — follow them. Consistency across the test suite is mandatory.

## Architecture & Data Flow

```
src/main.js
  └── src/core/index.js
        ├── src/core/cmds/index.js          → slash command registration
        │     ├── lists/  (mut-cmds.js + mut-callbacks.js)
        │     ├── dicts/  (enum-cmds.js + enum-callbacks.js, trans-cmds.js + trans-callbacks.js)
        │     └── collections/  (stub — not yet implemented)
        └── src/core/macros/index.js        → macro registration
              ├── lists/  (mut-macros.js + mut-handlers.js)
              ├── dicts/  (enum-macros.js + enum-handlers.js, trans-macros.js + trans-handlers.js)
              └── collections/  (stub — not yet implemented)
```

### Two Parallel Registration Paths

Every operation has **two** implementations — one for slash commands, one for macros:

| Layer | File | Purpose |
|-------|------|---------|
| **Commands** | `*-cmds.js` | Build `SlashCommand` objects, wire to `SlashCommandParser` |
| **Callbacks** | `*-callbacks.js` | Async functions receiving `(args, vals)` from slash parser |
| **Macros** | `*-macros.js` | Register via `macros.register(name, config)` |
| **Handlers** | `*-handlers.js` | Sync functions receiving `{unnamedArgs, list}` from macro engine |

### Context Bridge

`src/external/st-context.js` pulls all SillyTavern APIs from `SillyTavern.getContext()` once, then re-exports as `STContext`. All modules import from this bridge, not directly from the global.

```js
// st-context.js — single source of truth for SillyTavern APIs
const { SlashCommandParser, SlashCommand, macros, ... } = SillyTavern.getContext();
export const STContext = { SlashCommandParser, SlashCommand, macros, ... };
```

### NoxLib Integration

All argument parsing delegates to `NoxLib`:

- **Slash commands**: `NoxLib.SlashHandlers.argHandler` — methods: `parse()`, `parseVar()`, `parseMut()`
- **Macros**: `NoxLib.MacroHandlers.argHandler` — methods: `parse()`, `parseVar()`, `parseMut()`, `splitList()`, `zipList()`

### Variable Scoping

Both NoxLib and the test mocks support shorthand variable notation:
- `$varname` → global scope
- `.varname` → local scope
- @varname → scope lookup

### Error Handling

- **Slash callbacks**: throw `TypeError` / `Error` (propagates to SillyTavern)
- **Macro handlers**: `console.error()` + return empty string `''` (graceful degradation)

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/core/cmds/` | Slash command registration + callback logic |
| `src/core/macros/` | Macro registration + handler logic |
| `src/external/` | SillyTavern context bridge (imports from `SillyTavern.getContext()`) |
| `src/__deprecated__/` | Old registry pattern — being migrated to `src/core/` |
| `tests/` | Jest test suites mirroring `src/core/` structure |
| `tests/mocks/` | Empty — mocks are inline in `tests/setup.js` |

## Development Commands

```bash
# Build production bundle → dist/main.bundled.js
npm run build

# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage (80% branches, 100% functions/lines/statements)
npm run test:cov
```

Coverage thresholds are strict: **100% line/statement/function coverage** on all non-index source files under `src/core/`.

## Code Conventions & Common Patterns

### Naming

- **Commands**: kebab-case — `list-push`, `dict-get-keys`, `dict-from-entries`
- **Macros**: camelCase — `listPush`, `getDictKeys`, `dictFromEntries`
- **Handlers/Callbacks**: camelCase + suffix — `listPushCallback`, `listPushHandler`
- **Registration functions**: `initXxx` — `initMutSlashCMDs`, `initEnumMacros`
- **All aliases**: prefixed with `nox-` — `nox-list-push`, `nox-dict-get-keys`

### Slash Command Registration Pattern

```js
// src/core/cmds/lists/mut-cmds.js
import { STContext as ctx } from '../../../external/st-context.js';
import { listPushCallback } from './mut-callbacks.js';
const { SlashCommandParser, SlashCommand, SlashCommandNamedArgument, SlashCommandArgument, ARGUMENT_TYPE } = ctx;

async function initMutSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-push',
        callback: listPushCallback,
        aliases: ['nox-list-push'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to mutate',
                typeList: [ARGUMENT_TYPE.VARIABLE_NAME, ARGUMENT_TYPE.LIST],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: true,
        helpString: '',
        returns: 'The new length of the list',
    }));
}
```

### Macro Registration Pattern

```js
// src/core/macros/lists/mut-macros.js
import { STContext as ctx } from '../../../external/st-context.js';
import { listPushHandler } from './mut-handlers.js';
const { macros } = ctx;

async function initMutMacros() {
    macros.register('listPush', {
        category: 'Collection Tools - List Mutation',
        description: 'A mutation macro that pushes items to a list and returns the new list length.',
        aliases: [{ alias: 'noxListPush', visible: true }],
        unnamedArgs: [{ name: 'list', description: 'the list to mutate', sampleValue: '[1,2,3], .localVar, $globalVar', optional: false }],
        handler: listPushHandler,
        displayOverride: '{{listPush::list::[item1]::[item2]::...}}',
        exampleUsage: ['{{listPush::[1,2,3]::hello}}', '{{listPush::.myList::42}}'],
        returns: 'The new length of the list',
    });
}
```

### Handler/Callback Pattern

```js
// Callback (slash) — async, throws on error
const argH = NoxLib.SlashHandlers.argHandler;
async function listPushCallback(args, vals) {
    const { var: list, setVar: mutate } = argH.parseMut(vals.shift(), args, 'json');
    if (!Array.isArray(list)) throw new TypeError('[Collection Tools | listPush] First input is not a list.');
    vals.forEach(val => list.push(argH.parse(val)));
    mutate(list);
    return String(list.length);
}

// Handler (macro) — sync, console.error + '' on error
const argH = NoxLib.MacroHandlers.argHandler;
function listPushHandler({ unnamedArgs: [rawList], list: rawVals }) {
    const { var: list, setVar: mutate } = argH.parseMut(rawList, 'json');
    if (!Array.isArray(list)) { console.error('[Collection Tools | listPush] First input is not a list.'); return ''; }
    rawVals.forEach(val => list.push(argH.parse(val)));
    mutate(list);
    return String(list.length);
}
```

### Module Structure

Each domain (lists, dicts, collections) follows the same file split:

```
src/core/{cmds,macros}/{domain}/
├── index.js          → imports sub-modules, calls initXxx()
├── *-cmds.js / *-macros.js  → registration: build objects, call parser/macros.register()
└── *-callbacks.js / *-handlers.js  → logic: parse args, operate on data, return result
```

### Imports

- Always `import { STContext as ctx } from '../../../external/st-context.js'` for SillyTavern APIs
- Always `const argH = NoxLib.SlashHandlers.argHandler` or `NoxLib.MacroHandlers.argHandler`
- No direct global access to `SillyTavern` or `NoxLib` in business logic

## Important Files

| File | Role |
|------|------|
| `src/main.js` | Entry point — calls `initCollectionTools()` |
| `src/core/index.js` | Orchestrates `cmds()` + `macros()` initialization |
| `src/external/st-context.js` | SillyTavern API bridge |
| `manifest.json` | SillyTavern extension manifest (depends on `third-party/STLibs-Nox-Library`) |
| `webpack.config.js` | ESM → bundled output at `dist/main.bundled.js` |
| `jest.config.js` | Jest config: `happy-dom` env, 100% coverage thresholds |
| `tests/setup.js` | Global mocks for `SillyTavern`, `NoxLib`, `variables`, `NamedArguments` |
| `global.d.ts` | Extends NoxLib type definitions |

## Runtime/Tooling Preferences

- **Node.js** for build/test (ESM, `webpack`, `jest`)
- **Babel** (`@babel/preset-env`) for JS transpilation in webpack
- **Terser** for production minification
- **No Bun** — project uses Node with `--experimental-vm-modules` for Jest ESM support
- **No TypeScript** — uses JSDoc `@typedef` and `@import` annotations instead
- **ESM only** — `"type": "module"`, all files use `.js` with `import`/`export`

## Testing & QA

### Framework

- **Jest** with `happy-dom` (configured in `jest.config.js` as `testEnvironment: 'node'`)
- **ESM support** via `NODE_OPTIONS='--experimental-vm-modules'`

### Test Structure

Tests mirror the source tree:

```
tests/
├── setup.js                          ← global mocks (SillyTavern, NoxLib, variables)
├── varscope-smoke.test.js            ← smoke test for varScope/resolve mocks
└── core/
      ├── cmds/
      │     ├── lists/  mut-callbacks.test.js
      │     └── dicts/  enum-callbacks.test.js, trans-callbacks.test.js
      └── macros/
            ├── lists/  mut-handlers.test.js
            └── dicts/  enum-handlers.test.js, trans-handlers.test.js
```

### Test Patterns

- **Mocks** are global in `setup.js` — override per-test with `mockClear()` / `mockReturnValue()`
- **Scope helpers**: `makeScope(list)` factory creates `{ args, setVariable }` for slash command tests
- **Variable stores**: `globalThis.variables` and `resetVariables()` for macro scope isolation
- **Assertions**: standard Jest (`toBe`, `toEqual`, `toThrow`, `rejects.toThrow`, `toHaveBeenCalledWith`)
- **Coverage targets**: 80% branches, 100% functions/lines/statements on `src/core/**/*.js` (excludes `index.js` and `*-cmds.js`/`*-macros.js` registration files)

### Adding Tests

1. Create test file mirroring source path: `tests/core/{cmds,macros}/{domain}/{file}.test.js`
2. Import from corresponding `src/core/...` path
3. Use `beforeEach(() => { NoxLib.SlashHandlers.argHandler.parseVar.mockClear() })` to clear mocks
4. For slash callbacks: build scope with `makeScope()`, call `await callback(args, vals)`
5. For macro handlers: call `handler({ unnamedArgs: [...], list: [...] })` directly
