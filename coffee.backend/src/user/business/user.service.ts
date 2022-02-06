import { Injectable } from '@nestjs/common';
import { GuidService } from 'src/shared/edge/guid.service';
import { BusinessError } from 'src/shared/errors/business.error';
import { RepositoryError } from 'src/shared/errors/repository.error';
import { CoffeeLogger } from 'src/shared/util/logger';
import { CoffeeSecurity } from 'src/shared/util/security';
import { UserRepository } from '../repository/user.repository';
import { UserBO } from './bos/user.bo';

@Injectable()
export class UserService {
  private readonly log = new CoffeeLogger(UserService.name, this.guid.value);
  constructor(
    private userRepository: UserRepository,
    private guid: GuidService,
  ) {}

  async validateLogin(
    email: string,
    passwordHash: string,
  ): Promise<{ token: string; user: UserBO }> {
    const user = await this.userRepository.getUser(email).catch(err => {
      if (err instanceof RepositoryError) {
        this.log.business(
          `Invalid login attempt user not found with email ${email}`,
        );
        throw new BusinessError('Invalid login attempt!');
      }
      throw err;
    });
    if (user.passwordHash !== passwordHash) {
      throw new BusinessError('Invalid login attempt!');
    }
    this.log.business('Valid login attempt.');
    const signedJWT = CoffeeSecurity.signJWT(user.roles.map(r => r.caption));
    return { token: signedJWT, user: user };
  }
}
