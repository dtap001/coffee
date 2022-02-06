import { Injectable } from '@nestjs/common';
import { Config } from '../util/config';
import { CoffeeLogger } from '../util/logger';
import { createConnection, Connection } from 'typeorm';
import { SeedableRepostiory } from './seedable.interface';
import { BackendError } from '../errors/backend.error';
import { GuidService } from '../edge/guid.service';

@Injectable()
export class StorageService implements SeedableRepostiory {
  private readonly log = new CoffeeLogger(StorageService.name, this.guid.value);
  private dbConnection: Connection;
  private entityList = [];
  private seedableRepositories: SeedableRepostiory[];

  constructor(private guid: GuidService) {}
  registerEntity(entity) {
    this.entityList.push(entity);
  }

  registerSeedableRepository(seedableRepository: SeedableRepostiory) {
    this.seedableRepositories.push(seedableRepository);
  }

  async initialize() {
    const dbPath = Config.DBPath();
    this.log.info(`Connecting to DB: ${dbPath}.`);

    try {
      const connection: Connection = await createConnection({
        type: 'sqlite',
        database: dbPath, //"coffee.sqlite",
        entities: this.entityList,
        synchronize: true,
      });
      this.dbConnection = connection;
      this.log.info('DB is connected');
    } catch (err) {
      this.log.error(`Could not connect to the DB ${err} `, err);
      throw new BackendError('Could not connect to the DB');
    }
    await this.seed();
  }

  async seed() {
    this.seedableRepositories.forEach(
      async (seedable: SeedableRepostiory) => await seedable.seed(),
    );
  }

  getConnection() {
    return this.dbConnection;
  }
}
