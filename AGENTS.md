# Repository Guidelines

## Project Overview

**SillyTavern-Collection-Tools** (v1.3.0-alpha) is a SillyTavern browser extension providing a comprehensive library of **macros** (inline template functions) and **slash commands** (chat-input commands) for list and dictionary manipulation. It depends on STLibs-Nox-Library for argument parsing, coercion, and enum provider utilities.

The extension exposes two parallel interfaces for the same operations:
- **Macros**: `{{listPush::[1,2,3]::4}}` — inline template functions, synchronous
- **Slash Commands**: `/list-push [1,2,3] 4` — chat-input commands, async

Licensed under **GNU AGPL v3**.

## Architecture & Data Flow

### Dual-Interface, Two-Axis Taxonomy

The codebase is organized along two orthogonal axes:

| | **lists/** (arrays) | **dicts/** (objects) |
|---|---|---|
| **enum** (enumerate) | listIndex, listEntries | getDictKeys, getDictValues, getDictEntries |
| **mut** (mutate) | listPush, listPop, listUnshift, listShift, listSplice, listFill, listCopyWithin, listSort, listReverse | *(none — dicts immutable)* |
| **search** (find/index) | listAt, listIndexOf, listLastIndexOf, listFind, listFindLast, listFindIndex, listFindLastIndex | *(none)* |
| **test** (predicate) | listIncludes, listEvery, listSome | *(none)* |
| **trans** (transform) | listSlice, listConcat, listFlat, listWith, listToSplice, listToSort, listToReverse | dictFromEntries |

### Module Structure

```
src/
├── main.js                          # Entry point
├── core/
│   ├── index.js                     # Orchestrator: boots cmds + macros
│   ├── cmds/                        # Slash command registration + callbacks
│   │   ├── lists/                   # 5 categories (enum, mut, search, test, trans)
│   │   │   ├── *-cmds.js            # Declarative SlashCommand.fromProps()
│   │   │   └── *-callbacks.js       # Async callback implementations
│   │   ├── dicts/                   # 2 categories (enum, trans)
│   │   │   ├── *-cmds.js
│   │   │   └── *-callbacks.js
│   │   └── collections/             # Empty stubs (future expansion)
│   └── macros/                      # Macro registration + handlers
│       ├── lists/                   # 5 categories
│       │   ├── *-macros.js          # Declarative macros.register()
│       │   └── *-handlers.js        # Sync handler implementations
│       ├── dicts/                   # 2 categories
│       │   ├── *-macros.js
│       │   └── *-handlers.js
│       └── collections/             # Empty stubs
├── external/
│   ├── st-context.js                # Compile-time bridge: SillyTavern.getContext()
│   └── st-public.js                 # Runtime bridge: dynamic import of ST classes
└── __deprecated__/                  # Legacy registries
```

### Data Flow

1. `main.js` → `initCollectionTools()` → `initSlashCMDS()` + `initMacros()`
2. Each category index calls its sub-initializers (e.g., `initListMacros()` → `enumMacros()`, `mutMacros()`, etc.)
3. Each sub-init calls `macros.register()` or `SlashCommandParser.addCommandObject()` with a config object
4. At runtime, SillyTavern invokes the registered handler/callback with parsed arguments
5. Handlers/callbacks parse args via NoxLib, operate on data, return stringified results

### External Dependencies

| Dependency | Role |
|---|---|
| `NoxLib` (STLibs-Nox-Library) | `MacroHandlers.argHandler`, `SlashHandlers.argHandler`, `EnumProviders` for autocomplete |
| `SillyTavern.getContext()` | Extension API: command parser, macro registry, argument types, variable store |
| `SillyTavern` globals (direct) | Used only in deprecated code; new code uses `STContext` bridge |

## Key Directories

| Directory | Purpose |
|---|---|
| `src/core/cmds/lists/` | List slash commands — 8 categories, ~30 commands |
| `src/core/cmds/dicts/` | Dict slash commands — 2 categories, ~4 commands |
| `src/core/macros/lists/` | List macros — 8 categories, ~20 macros |
| `src/core/macros/dicts/` | Dict macros — 2 categories, ~4 macros |
| `src/external/` | SillyTavern API bridges (compile-time + runtime) |
| `src/__deprecated__/` | Legacy command registries (7 registries, 5 months old) |
| `tests/core/` | Test files mirroring `src/core/` structure |
| `dist/` | Build output (`main.bundled.js`) |

## Development Commands

```bash
# Build (webpack → dist/main.bundled.js)
npm run build

# Run tests (Jest, Node environment)
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

Coverage thresholds: **80% branches, 100% functions/lines/statements**. Coverage excludes `index.js`, `*-cmds.js`, `*-macros.js` (thin registration wrappers).

## Code Conventions & Common Patterns

### Naming Conventions

| Interface | Style | Example |
|---|---|---|
| Macro name | camelCase | `listIndex`, `listPush` |
| Macro alias | `nox` prefix | `noxListIndex` |
| Command name | kebab-case | `list-index`, `list-push` |
| Command alias | `nox-` prefix | `nox-list-index` |
| Handler function | `*Handler` suffix | `listIndexHandler` |
| Callback function | `*Callback` suffix | `listIndexCallback` |
| Category | lowercase | `enum`, `mut`, `search`, `test`, `trans` |

### Macro Handler Pattern

```js
function listIndexHandler({ unnamedArgs: [rawList], list: rawListArgs }) {
  const list = argH.parseVar(rawList, 'json');
  if (!Array.isArray(list)) {
    console.error('[Collection Tools | listIndexHandler] Input must be a list.');
    return '';  // Silent failure
  }
  // ... operate on list ...
  return JSON.stringify(result);  // Always return string
}
```

**Key rules:**
- Handlers are **synchronous**
- Error handling: `console.error` + return `''` (silent failure)
- Output: always `JSON.stringify()` or `String()`
- Use `argH.parseVar(raw, 'json')` for JSON arrays/objects
- Use `argH.parseMut(raw, 'json')` for mutations → returns `{ var, setVar }`

### Slash Command Callback Pattern

```js
async function listIndexCallback(args, val) {
  const list = argH.parseVar(val, args, 'json');
  if (!Array.isArray(list)) {
    throw new TypeError('[Collection Tools | listIndex] Input must be a list.');
  }
  // ... operate on list ...
  return JSON.stringify(result);
}
```

**Key rules:**
- Callbacks are **async**
- Error handling: `throw new TypeError(...)` (explicit failure)
- Use `argH.parseVar(val, args, 'json')` — second arg is NamedArguments context
- Use `argH.parseMut(val, args, 'json')` for mutations

### Registration Patterns

**Macro registration:**
```js
macros.register('commandName', {
  category: 'Collection Tools - [Category]',
  description: '...',
  aliases: [{ alias: 'noxCommandName', visible: true }],
  unnamedArgs: [{ name: 'list', description: '...', sampleValue: '...', optional: false }],
  list: { min: 1 },
  handler: handlerFunction,
  displayOverride: '{{commandName::list}}',
  exampleUsage: ['{{commandName::[1,2,3]}}'],
  returns: 'Description of return value',
});
```

**Command registration:**
```js
SlashCommandParser.addCommandObject(SlashCommand.fromProps({
  name: 'command-name',
  callback: callbackFunction,
  aliases: ['nox-command-name'],
  unnamedArgumentList: [
    SlashCommandArgument.fromProps({
      description: '...',
      typeList: [ARGUMENT_TYPE.LIST, ARGUMENT_TYPE.VARIABLE_NAME],
      enumProvider: listAndShorthands,
      isRequired: true,
    }),
  ],
  helpString: '',
  returns: 'Description',
}));
```

### Closure-Based Commands (forEach, map, filter, reduce, find)

```js
const closure = new SlashCommandClosure({
  argumentList: [
    { name: 'item', typeList: [ARGUMENT_TYPE.ANY] },
    { name: 'index', typeList: [ARGUMENT_TYPE.ANY] },
    { name: 'array', typeList: [ARGUMENT_TYPE.ANY] },
  ],
  providedArgumentList: [item, index, array],
  breakController: new SlashCommandBreakController(),
});
closure.execute();
if (closure.isAborted) return JSON.stringify({ abort: true });
if (closure.isBreak) return JSON.stringify({ break: true });
```

### Argument Parsing Utilities (from NoxLib)

| Function | Purpose |
|---|---|
| `argH.parseVar(raw, 'json')` | Parse JSON array/object from raw input |
| `argH.parseMut(raw, 'json')` | Parse + get `{ var, setVar }` for mutation persistence |
| `argH.parse(val, 'int')` | Convert to integer |
| `argH.stBoolCoercion(val)` | Convert string booleans (`'true'` → `true`) |
| `EnumProviders.shorthandAndValue('shorthand-w-scope', 'array')` | Autocomplete suggestions |

## Important Files

| File | Role |
|---|---|
| `src/main.js` | Entry point — calls `initExt()` from core |
| `src/core/index.js` | Orchestrator — boots slash commands + macros |
| `src/external/st-context.js` | Compile-time SillyTavern API bridge |
| `src/external/st-public.js` | Runtime SillyTavern class bridge (dynamic import) |
| `manifest.json` | Extension manifest: name, version, dependency on Nox Library |
| `package.json` | Project metadata, scripts, devDependencies |
| `webpack.config.js` | Build: `src/main.js` → `dist/main.bundled.js`, Babel + Terser |
| `jest.config.js` | Test config: coverage thresholds, setup file |
| `tests/setup.js` | Shared test harness: mocks SillyTavern globals, variable store |

## Runtime/Tooling Preferences

| Aspect | Detail |
|---|---|
| **Runtime** | SillyTavern browser environment (extension context) |
| **Package manager** | npm (package-lock.json present) |
| **Module system** | ESM (`"type": "module"`) |
| **Bundler** | webpack 5 with Babel transpilation + Terser minification |
| **Test runner** | Jest (Node environment) |
| **Node version** | Check `package.json` engines field |
| **Editor** | VS Code with cSpell (acknowledges non-standard spellings: "breaked", "unshifts") |
| **License** | GNU AGPL v3 |

**No runtime dependencies** — all deps are dev-only. Nox Library and SillyTavern are injected at runtime by the host application.

## Testing & QA

### Test Infrastructure

- **Framework**: Jest with `testEnvironment: 'node'`
- **Setup**: `tests/setup.js` — mocks `SillyTavern.getContext()` with variable store (local/global Maps), imports NoxLib
- **Pattern**: `tests/core/{macros,cmds}/{lists,dicts}/{module}.test.js` mirrors `src/core/` structure
- **Helpers**: `resetVariables()` clears variable store between tests; `jest.spyOn(console.error).mockImplementation()` suppresses error output

### Test Structure (per file)

```js
describe('handlerFn', () => {
  beforeEach(() => { resetVariables(); jest.spyOn(console, 'error').mockImplementation(() => {}); });
  afterEach(() => jest.restoreAllMocks());

  describe('return values', () => { /* happy path, edge cases */ });
  describe('console errors', () => { /* invalid inputs */ });
  describe('datatype parsing', () => { /* strings, booleans, ints, floats, arrays, objects */ });
  describe('shorthand variables', () => { /* .local, $global, nonexistent */ });
});
```

### Coverage Status

| Layer | Status |
|---|---|
| Macro handlers (7 files) | ✅ Fully tested |
| Command callbacks (7 files) | ✅ Fully tested |
| Macro registration files | ⚠️ Excluded by config (thin wrappers) |
| Command registration files | ⚠️ Excluded by config (thin wrappers) |
| `collections/` stubs | ❌ No tests |
| External bridges | ❌ No tests |
| Deprecated code | ❌ No tests |

### Adding Tests

1. Mirror the source file path under `tests/core/`
2. Import `resetVariables` from `../../../setup.js`
3. Use `setLocal`/`setGlobal` helpers for variable store manipulation
4. Follow the 4-block describe structure: return values, console errors, datatype parsing, shorthand variables
5. Handlers are tested as pure sync functions; callbacks are tested as async functions
