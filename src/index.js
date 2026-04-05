import {registerMutableSlashCommands} from './commands/mutable/registry.js';
import {registerRandomSlashCommands} from './commands/random/registry.js';

import {registerRandomCollectionMacros} from './macros/random/registry.js';
import {registerMutableListMacros} from './macros/mutable/registry.js';



registerMutableSlashCommands();
registerRandomSlashCommands();

registerRandomCollectionMacros();
registerMutableListMacros();
