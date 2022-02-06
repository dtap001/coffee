import { Injectable } from '@nestjs/common';
import { CoffeeLogger } from 'src/shared/util/logger';
import { StorageService } from 'src/shared/respository/storage.service';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { CoffeeSecurity } from 'src/shared/util/security';
import { UserBO } from '../business/bos/user.bo';
import { RepositoryError } from 'src/shared/errors/repository.error';
import { SeedableRepostiory } from 'src/shared/respository/seedable.interface';
import { BackendError } from 'src/shared/errors/backend.error';
import { GuidService } from 'src/shared/edge/guid.service';

@Injectable()
export class UserRepository implements SeedableRepostiory {
  private readonly log = new CoffeeLogger(StorageService.name, this.guid.value);
  constructor(private storage: StorageService, private guid: GuidService) {
    this.storage.registerEntity(UserEntity);
    this.storage.registerEntity(RoleEntity);
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
      if (users == null || users.length == 0) {
        await this.storage
          .getConnection()
          .getRepository(UserEntity)
          .save({
            passwordHash: CoffeeSecurity.hash('admin'),
            email: 'admin',
            name: 'admin',
            roles: rolesX,
          } as UserEntity);
      }

      return Promise.resolve();
    } catch (err) {
      this.log.error('ensureDefaultUser error: ' + err, err);
      return Promise.reject(err);
    }
  }

  async getUser(email: string): Promise<UserBO> {
    try {
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
    } catch (err) {
      this.log.error('Getuser error: ' + err, err);
      throw new BackendError(err);
    }
  }
}
