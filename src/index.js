import {registerRandomCollectionSlashCommands} from './commands/collections/random/registry.js';

import {registerMutableDictSlashCommands} from './commands/dictionaries/mutable/registry.js';
import {registerImmutableDictSlashCommands} from './commands/dictionaries/immutable/registry.js';

import {registerMutableSlashCommands} from './commands/lists/mutable/registry.js';
import {registerZipSlashCommands} from './commands/lists/zip/registry.js';

import {registerRandomCollectionMacros} from './macros/collections/random.js';
import {registerMutableListMacros} from './macros/lists/mutable.js';



Promise.all([
    registerMutableDictSlashCommands(),
    registerImmutableDictSlashCommands(),
    registerMutableSlashCommands(),
    registerZipSlashCommands(),
    registerRandomCollectionSlashCommands(),
    registerMutableListMacros(),
    registerRandomCollectionMacros()
]);
