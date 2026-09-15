// Smoke test for varScope/resolve mocks — validates setup.js additions.
// Globals (variables, resetVariables, NoxLib.MacroHandlers.argHandler.varScope/resolve)
// are provided by setup.js via setupFilesAfterEnv.

const { varScope, resolve } = globalThis.NoxLib.MacroHandlers.argHandler;
const { variables, resetVariables } = globalThis;

describe('varScope', () => {
    test('recognizes $ as global prefix', () => {
        expect(varScope('$foo')).toEqual(['global', 'foo']);
    });

    test('recognizes . as local prefix', () => {
        expect(varScope('.bar')).toEqual(['local', 'bar']);
    });

    test('returns null for no prefix', () => {
        expect(varScope('noPrefix')).toBeNull();
    });

    test('returns null for empty string', () => {
        expect(varScope('')).toBeNull();
    });

    test('returns null for non-identifiers', () => {
        expect(varScope('123abc')).toBeNull();
        expect(varScope('has-space')).toBeNull();
        expect(varScope('has.dots')).toBeNull();
    });

    test('handles underscore and hyphen in var names', () => {
        expect(varScope('$my_var')).toEqual(['global', 'my_var']);
        expect(varScope('.my-var')).toEqual(['local', 'my-var']);
    });
});

describe('resolve', () => {
    beforeEach(() => {
        resetVariables();
        variables.global.set('myVar', 'hello world');
        variables.local.set('temp', '42');
    });

    test('resolves global variable', () => {
        expect(resolve('$myVar')).toBe('hello world');
    });

    test('resolves local variable', () => {
        expect(resolve('.temp')).toBe('42');
    });

    test('returns literal unchanged when no scope', () => {
        expect(resolve('literal')).toBe('literal');
    });

    test('returns "undefined" string when variable not set', () => {
        expect(resolve('$nonexistent')).toBe('undefined');
    });

    test('resolves numeric values as strings', () => {
        variables.global.set('num', 123);
        expect(resolve('$num')).toBe('123');
    });
});

describe('resetVariables', () => {
    test('clears both scopes', () => {
        variables.global.set('a', 1);
        variables.local.set('b', 2);
        resetVariables();
        expect(variables.global.has('a')).toBe(false);
        expect(variables.local.has('b')).toBe(false);
    });
});

// ── Slash command varScope / resolve / NamedArguments ────────────────────────────

const { varScope: slashVarScope, resolve: slashResolve } = globalThis.NoxLib.SlashHandlers.argHandler;
const { NamedArguments } = globalThis;

describe('Slash varScope', () => {
    test('recognizes @ as scope prefix', () => {
        expect(slashVarScope('@myVar')).toEqual(['scope', 'myVar']);
    });

    test('recognizes $ as global prefix', () => {
        expect(slashVarScope('$foo')).toEqual(['global', 'foo']);
    });

    test('recognizes . as local prefix', () => {
        expect(slashVarScope('.bar')).toEqual(['local', 'bar']);
    });

    test('returns null for no prefix', () => {
        expect(slashVarScope('noPrefix')).toBeNull();
    });

    test('returns null for empty string', () => {
        expect(slashVarScope('')).toBeNull();
    });

    test('returns null for non-identifiers', () => {
        expect(slashVarScope('123abc')).toBeNull();
        expect(slashVarScope('has-space')).toBeNull();
        expect(slashVarScope('has.dots')).toBeNull();
    });

    test('handles underscore and hyphen in var names', () => {
        expect(slashVarScope('@my_var')).toEqual(['scope', 'my_var']);
        expect(slashVarScope('.my-var')).toEqual(['local', 'my-var']);
    });
});

describe('Slash resolve', () => {
    beforeEach(() => {
        resetVariables();
        variables.global.set('globalVar', 'from-global');
        variables.local.set('localVar', 'from-local');
    });

    test('resolves @ via NamedArguments scope', () => {
        const scope = new NamedArguments({ myVar: 'scope-value' });
        expect(slashResolve('@myVar', scope)).toBe('scope-value');
    });

    test('resolves $ via global store', () => {
        expect(slashResolve('$globalVar')).toBe('from-global');
    });

    test('resolves . via local store', () => {
        expect(slashResolve('.localVar')).toBe('from-local');
    });

    test('returns literal unchanged when no shorthand', () => {
        expect(slashResolve('literal')).toBe('literal');
    });


    test('returns "undefined" string when @ variable not in scope', () => {
        const scope = new NamedArguments({ other: 'val' });
        expect(slashResolve('@missing', scope)).toBe('undefined');
    });

    test('returns "undefined" string when $ variable not in global store', () => {
        expect(slashResolve('$nonexistent')).toBe('undefined');
    });

    test('returns "undefined" string when . variable not in local store', () => {
        expect(slashResolve('.nonexistent')).toBe('undefined');
    });

    test('resolves numeric values as strings', () => {
        variables.global.set('num', 123);
        expect(slashResolve('$num')).toBe('123');
    });

    test('resolves JSON string values', () => {
        variables.global.set('obj', JSON.stringify({ a: 1 }));
        expect(slashResolve('$obj')).toBe('{"a":1}');
    });
});

describe('NamedArguments', () => {
    test('creates scope with no initial variables', () => {
        const scope = new NamedArguments();
        expect(scope._scope.existsVariable('x')).toBe(false);
        expect(scope._scope.getVariable('x')).toBeUndefined();
    });

    test('pre-defines variables in constructor', () => {
        const scope = new NamedArguments({ foo: 'bar', num: 42 });
        expect(scope._scope.existsVariable('foo')).toBe(true);
        expect(scope._scope.getVariable('foo')).toBe('bar');
        expect(scope._scope.getVariable('num')).toBe(42);
    });

    test('setVariable updates existing variable', () => {
        const scope = new NamedArguments({ x: 'old' });
        scope._scope.setVariable('x', 'new');
        expect(scope._scope.getVariable('x')).toBe('new');
    });

    test('setVariable creates new variable', () => {
        const scope = new NamedArguments();
        scope._scope.setVariable('newKey', 'value');
        expect(scope._scope.existsVariable('newKey')).toBe(true);
        expect(scope._scope.getVariable('newKey')).toBe('value');
    });

    test('existsVariable returns false for missing key', () => {
        const scope = new NamedArguments({ a: 1 });
        expect(scope._scope.existsVariable('b')).toBe(false);
    });

    test('setVariable overwrites with different types', () => {
        const scope = new NamedArguments({ val: 'string' });
        scope._scope.setVariable('val', 123);
        expect(scope._scope.getVariable('val')).toBe(123);
        scope._scope.setVariable('val', { nested: true });
        expect(scope._scope.getVariable('val')).toEqual({ nested: true });
    });
});
