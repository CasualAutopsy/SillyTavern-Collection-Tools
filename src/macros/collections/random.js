import {sample, sampleSize, shuffle} from 'lodash-es';
import {parseInt} from 'lodash-es';

const {macroParseVar}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js')
    , {parseJSON}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');



export async function registerRandomCollectionMacros() {
    const {registerMacro}
        = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext().macros.registry;

    registerMacro(
        'sampleCollection',
        {
            category: 'Collection Utilities',
            unnamedArgs: [
                {
                    name: 'n',
                    description: 'The number of elements to sample.',
                    optional: false,
                },
                {
                    name: 'target',
                    description: 'The target collection to sample from.',
                    optional: false,
                }
            ],
            description: 'Samples a random element or multiple elements from a given collection.',
            returns: 'The sampled element.',
            handler: ({unnamedArgs: [nRaw, targetRaw], resolve}) => {
                let n = parseInt(nRaw);
                let [target, _] = macroParseVar(targetRaw, resolve);

                try {
                    target = parseJSON(target);
                } catch {
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                return n === 1
                    ? String(sample(target))
                    : JSON.stringify(sampleSize(target, n))
            }
        }
    );


    registerMacro(
        'shuffleCollection',
        {
            category: 'Collection Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target collection to shuffle.',
                    optional: false,
                }
            ],
            description: 'Shuffles a given collection.',
            returns: 'The shuffled collection.',
            handler: ({unnamedArgs: [targetRaw], resolve}) => {
                let [target, _] = macroParseVar(targetRaw, resolve);

                try {
                    target = parseJSON(target);
                } catch {
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                return JSON.stringify(shuffle(target));
            }
        }
    );
}

