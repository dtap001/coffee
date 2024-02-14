import { Injectable } from '@nestjs/common';
import { Config } from '../util/config';
import { CoffeeLogger, LogMessage, LogOrigin } from '../util/logger';
import { createConnection, Connection } from 'typeorm';
import { SeedableRepostiory } from './seedable.interface';
import { ErrorFactory } from '../errors/error.factory';
import { ErrorMessage, ErrorOrigin } from '../errors/base.error';

@Injectable()
export class StorageService implements SeedableRepostiory {
  private readonly log = new CoffeeLogger(StorageService.name);
  private dbConnection: Connection;
  private entityList = [];
  private seedableRepositories: SeedableRepostiory[] = [];


  registerEntity(entity) {
    this.entityList.push(entity);
  }

  registerSeedableRepository(seedableRepository: SeedableRepostiory) {
    this.seedableRepositories.push(seedableRepository);
  }

  async initialize() {
    const dbPath = Config.DBPath();
    this.log.info(
      new LogMessage(`Connecting to DB: ${dbPath}.`),
      new LogOrigin(this.initialize.name),
    );

    try {
      const connection: Connection = await createConnection({
        type: 'sqlite',
        database: dbPath, //"coffee.sqlite",
        entities: this.entityList,
        synchronize: true,
      });
      this.dbConnection = connection;
      this.log.info(
        new LogMessage('DB is connected'),
        new LogOrigin(this.initialize.name),
      );
    } catch (err) {
      throw ErrorFactory.internalServerError(
        new ErrorMessage(`Could not connect to the DB ${err} `),
        new ErrorOrigin(`${StorageService.name}${this.initialize.name}`),
        err,
      );
    }
    await this.seed();
  }

  async seed() {
    for (const seedable of this.seedableRepositories) {
      await seedable.seed();
    }
  }

  getConnection() {
    return this.dbConnection;
  }
}
