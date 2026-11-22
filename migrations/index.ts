import * as migration_20261121_170748_initial from './20261121_170748_initial';
import * as migration_20261121_182827_sync from './20261121_182827_sync';
import * as migration_20261122_172810_resume_projects from './20261122_172810_resume_projects';

export const migrations = [
  {
    up: migration_20261121_170748_initial.up,
    down: migration_20261121_170748_initial.down,
    name: '20261121_170748_initial',
  },
  {
    up: migration_20261121_182827_sync.up,
    down: migration_20261121_182827_sync.down,
    name: '20261121_182827_sync',
  },
  {
    up: migration_20261122_172810_resume_projects.up,
    down: migration_20261122_172810_resume_projects.down,
    name: '20261122_172810_resume_projects'
  },
];
