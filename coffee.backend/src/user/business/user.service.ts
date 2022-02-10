import { Injectable } from '@nestjs/common';
import { ErrorMessage, ErrorOrigin } from '../../shared/errors/base.error';
import { ErrorFactory } from '../../shared/errors/error.factory';
import { RepositoryError } from '../../shared/errors/repository.error';
import { CoffeeLogger, LogMessage, LogOrigin } from '../../shared/util/logger';
import { CoffeeSecurity } from '../../shared/util/security';
import { UserRepository } from '../repository/user.repository';
import { UserBO } from './bos/user.bo';

@Injectable()
export class UserService {
  private readonly log = new CoffeeLogger(UserService.name);
  constructor(
    private userRepository: UserRepository,
    private security: CoffeeSecurity,
  ) {}

  async validateLogin(
    email: string,
    passwordHash: string,
  ): Promise<{ token: string; user: UserBO }> {
    const user = await this.userRepository.getUser(email).catch(err => {
      if (err.constructor === RepositoryError) {
        throw ErrorFactory.business(
          new ErrorMessage('Invalid login attempt!'),
          new ErrorOrigin(`${UserService.name}:${this.validateLogin.name}`),
        );
      } else {
        throw ErrorFactory.internalServerError(
          new ErrorMessage(err),
          new ErrorOrigin(`${UserService.name}:${this.validateLogin.name}`),
        );
      }
    });
    if (user.passwordHash !== passwordHash) {
      throw ErrorFactory.business(
        new ErrorMessage('Invalid login attempt!'),
        new ErrorOrigin(`${UserService.name}:${this.validateLogin.name}`),
      );
    }
    this.log.business(
      new LogMessage('Valid login attempt.'),
      new LogOrigin(this.validateLogin.name),
    );
    const signedJWT = this.security.signJWT(user.roles.map(r => r.caption));
    return { token: signedJWT, user: user };
  }
}
