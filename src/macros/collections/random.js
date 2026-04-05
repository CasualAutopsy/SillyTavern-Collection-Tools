import {sample, sampleSize, shuffle} from 'lodash-es';
import {parseInt} from 'lodash-es';

import {macroIsVarCheck} from '../../../utils.js';

const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

const macros = context.macros;



export async function registerRandomCollectionMacros() {
    macros.registry.registerMacro(
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
                let [target, _] = macroIsVarCheck(targetRaw, resolve);

                try {
                    target = JSON.parse(target);
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


    macros.registry.registerMacro(
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
                let [target, _] = macroIsVarCheck(targetRaw, resolve);

                try {
                    target = JSON.parse(target);
                } catch {
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                return JSON.stringify(shuffle(target));
            }
        }
    );
}

