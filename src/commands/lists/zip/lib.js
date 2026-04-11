import {
    zip,
    zipObject,
    zipObjectDeep
} from 'lodash-es';

const {
    parseJSONOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');

export async function listZipCMD(args, sources) {
    sources = sources.map(src => parseJSONOrVar(src, args));

    return JSON.stringify(zip(...sources));
}

export async function listZipObjectCMD(args, [keys, values]) {
    [keys, values] = [keys, values].map(src => parseJSONOrVar(src, args));

    return JSON.stringify(
        args.deep
            ? zipObjectDeep(keys, values)
            : zipObject(keys, values)
    );
}
