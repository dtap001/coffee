import { SetMetadata } from '@nestjs/common';
import { CoffeeRole } from '../util/security';

export const ROLES_METADATA_KEY = 'roles';

export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles);
export const AdminRole = () =>
  SetMetadata(ROLES_METADATA_KEY, [CoffeeRole.ADMIN]);
