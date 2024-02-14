import { UserBO } from 'src/user/business/bos/user.bo';

export class SessionContext {
  guid: string;
  user: UserBO;
}
