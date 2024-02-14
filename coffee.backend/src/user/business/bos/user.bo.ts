import { RoleBO } from './role.bo';

export class UserBO {
  public guid: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public roles: RoleBO[];
}
