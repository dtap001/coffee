import { Injectable } from '@nestjs/common';
import { CoffeeLogger } from 'src/shared/util/logger';
import { StorageService } from 'src/shared/respository/storage.service';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { CoffeeSecurity } from 'src/shared/util/security';
import { UserBO } from '../business/bos/user.bo';
import { RepositoryError } from 'src/shared/errors/repository.error';
import { SeedableRepostiory } from 'src/shared/respository/seedable.interface';
import { GuidService } from 'src/shared/edge/guid.service';

@Injectable()
export class UserRepository implements SeedableRepostiory {
  private readonly log = new CoffeeLogger(UserRepository.name, this.guid.value);

  constructor(
    private storage: StorageService,
    private guid: GuidService,
    private security: CoffeeSecurity,
  ) {
    this.storage.registerEntity(UserEntity);
    this.storage.registerEntity(RoleEntity);
    this.storage.registerSeedableRepository(this);
    this.log.info('Registered entities');
  }

  async seed() {
    this.log.info('Seeding');
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
            guid: this.guid.generateUUID(),
            email: 'admin',
            name: 'admin',
            roles: rolesX,
          } as UserEntity);
      }

      return Promise.resolve();
    } catch (err) {
      this.log.error('ensureDefaultUser error', err);
      return Promise.reject(err);
    }
  }

  async getUser(email: string): Promise<UserBO> {
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
