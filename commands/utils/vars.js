import {
    getLocalVariable,
    setLocalVariable,
    getGlobalVariable,
    setGlobalVariable
} from '../../../../../variables.js';



export function getStorageType(target, args) {
    // Scoped variable: parse on read, stringify on write
    if (args._scope.existsVariable(target)) {
        const get = () => JSON.parse(args._scope.getVariable(target));
        const set = (list) => args._scope.setVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Local variable storage
    if (getLocalVariable(target) !== '') {
        const get = () => JSON.parse(getLocalVariable(target));
        const set = (list) => setLocalVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Global variable storage
    if (getGlobalVariable(target) !== '') {
        const get = () => JSON.parse(getGlobalVariable(target));
        const set = (list) => setGlobalVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Inline list: parse target as JSON, no persistence
    const get = () => JSON.parse(target);
    const set = () => {};
    return { list: get(), setList: set };
}
