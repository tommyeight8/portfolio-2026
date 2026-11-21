import * as migration_20261121_170748_initial from './20261121_170748_initial';
import * as migration_20261121_182827_sync from './20261121_182827_sync';

export const migrations = [
  {
    up: migration_20261121_170748_initial.up,
    down: migration_20261121_170748_initial.down,
    name: '20261121_170748_initial',
  },
  {
    up: migration_20261121_182827_sync.up,
    down: migration_20261121_182827_sync.down,
    name: '20261121_182827_sync'
  },
];
