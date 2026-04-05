import {registerMutableSlashCommands} from './commands/lists/mutable/registry.js';
import {registerRandomSlashCommands} from './commands/collections/random/registry.js';

import {registerRandomCollectionMacros} from './macros/collections/random.js';
import {registerMutableListMacros} from './macros/lists/mutable.js';



registerMutableSlashCommands();
registerRandomSlashCommands();

registerRandomCollectionMacros();
registerMutableListMacros();
