import { Injectable } from '@nestjs/common';
import { CoffeeLogger, LogMessage, LogOrigin } from 'src/shared/util/logger';
import { StorageService } from 'src/shared/respository/storage.service';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { CoffeeSecurity } from 'src/shared/util/security';
import { UserBO } from '../business/bos/user.bo';
import { RepositoryError } from 'src/shared/errors/repository.error';
import { SeedableRepostiory } from 'src/shared/respository/seedable.interface';

@Injectable()
export class UserRepository implements SeedableRepostiory {
  private readonly log = new CoffeeLogger(UserRepository.name);

  constructor(
    private storage: StorageService,
    private security: CoffeeSecurity,
  ) {
    this.storage.registerEntity(UserEntity);
    this.storage.registerEntity(RoleEntity);
    this.storage.registerSeedableRepository(this);
    this.log.info(
      new LogMessage('Registered entities'),
      new LogOrigin('constructor'),
    );
  }

  async seed() {
    this.log.info(new LogMessage('Seeding'), new LogOrigin(this.seed.name));
    try {
      const roles = await this.storage
        .getConnection()
        .getRepository(RoleEntity)
        .find();

      if (roles == null || roles.length == 0) {
        await this.storage.getConnection().getRepository(RoleEntity).save({
          caption: 'All',
        });
      }

      const rolesX = await this.storage
        .getConnection()
        .getRepository(RoleEntity)
        .find();

      const users = await this.storage
        .getConnection()
        .getRepository(UserEntity)
        .find({ relations: ['roles'] });

      if (users) {
        await this.storage
          .getConnection()
          .getRepository(UserEntity)
          .save({
            passwordHash: this.security.hash('admin'),
            guid: this.security.generateUUID(),
            email: 'admin',
            name: 'admin',
            roles: rolesX,
          } as UserEntity);
      }

      return Promise.resolve();
    } catch (err) {
      this.log.error(
        new LogMessage('ensureDefaultUser error'),
        new LogOrigin(err),
      );
      return Promise.reject(err);
    }
  }

  async getUser(email: string): Promise<UserBO> {
    this.storage = null;
    const user = await this.storage
      .getConnection()
      .getRepository(UserEntity)
      .findOne(
        {
          email: email,
        } as UserEntity,
        { relations: ['roles'] },
      );

    if (!user) {
      throw new RepositoryError('User not found');
    }

    return user.toBO();
  }
}
