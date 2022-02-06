import { Injectable } from '@nestjs/common';
import { GuidService } from 'src/shared/edge/guid.service';
import { ErrorFactory } from 'src/shared/errors/error.factory';
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
    private errorFactory: ErrorFactory,
    private security: CoffeeSecurity,
  ) {}

  async validateLogin(
    email: string,
    passwordHash: string,
  ): Promise<{ token: string; user: UserBO }> {
    const user = await this.userRepository.getUser(email).catch(err => {
      if (err.constructor === RepositoryError) {
        throw this.errorFactory.business(
          `${UserService.name}:${this.validateLogin.name}`,
          'Invalid login attempt!',
        );
      } else {
        throw this.errorFactory.internalServerError(
          `${UserService.name}:${this.validateLogin.name}`,
          err,
        );
      }
    });
    if (user.passwordHash !== passwordHash) {
      throw this.errorFactory.business(
        `${UserService.name}:${this.validateLogin.name}`,
        'Invalid login attempt!',
      );
    }
    this.log.business(
      `${UserService.name}:${this.validateLogin.name}`,
      'Valid login attempt.',
    );
    const signedJWT = this.security.signJWT(user.roles.map(r => r.caption));
    return { token: signedJWT, user: user };
  }
}
