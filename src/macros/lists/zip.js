import {zip,zipObject} from 'lodash-es';

const {parseJSON}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js')
    , {macroParseVar}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');



export async function registerZipListMacros() {
    const {registerMacro}
        = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext().macros.registry;


    registerMacro(
        'zipList',
        {
            category: 'List Utilities',
            list: {
                min: 2
            },
            description: 'Zip lists together into a list of tuples.',
            returns: 'The zipped list of tuples.',
            handler: ({list: [...sourcesRaw], resolve}) => {
                const sources = sourcesRaw.map(item => parseJSON(macroParseVar(item, resolve)[0]));

                return JSON.stringify(zip(...sources));
            }
        }
    );

    registerMacro(
        'zipObjectList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'keys',
                    description: '',
                    optional: false,
                },
                {
                    name: 'values',
                    description: '',
                    optional: false,
                },
            ],
            description: '',
            returns: '',
            handler: ({unnamedArgs: [keysRaw, valuesRaw], resolve}) => {
                const keys = parseJSON(macroParseVar(keysRaw, resolve)[0])
                    , values = parseJSON(macroParseVar(valuesRaw, resolve)[0]);

                return JSON.stringify(zipObject(keys, values));
            }
        }
    );
}
