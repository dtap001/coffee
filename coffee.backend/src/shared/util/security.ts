import * as crypto from 'crypto';
import * as jsonWebToken from 'jsonwebtoken';
import * as fs from 'fs';
import { CoffeeLogger, LogMessage, LogOrigin } from './logger';
import { Config } from './config';
import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '../errors/error.factory';
import uuidGen = require('uuid');
import { ErrorMessage } from '../errors/base.error';

@Injectable()
export class CoffeeSecurity {
  private readonly log = new CoffeeLogger(CoffeeSecurity.name);
  private privateKEY: string;
  private publicKEY: string;

  constructor(private errorFactory: ErrorFactory) {}

  init() {
    try {
      this.privateKEY = fs.readFileSync(Config.JWTPrivateKeyPath(), 'utf8'); //use this to generate http://travistidwell.com/jsencrypt/demo/
      this.publicKEY = fs.readFileSync(Config.JWTPublicKeyPath(), 'utf8');
    } catch (err) {
      throw this.errorFactory.internalServerError(
        new ErrorMessage(
          `Failed to load JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()}`,
        ),
        err,
      );
    }
    this.log.info(
      new LogMessage(
        `Loaded JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()}`,
      ),
      new LogOrigin(this.init.name),
    );
  }

  hash(raw: string) {
    const hash = crypto.createHash('sha256').update(raw).digest('hex');
    return hash;
  }

  signJWT(roles: string[]) {
    this.log.business(
      new LogMessage(`Signing jwt with roles ${roles}`),
      new LogOrigin(this.signJWT.name),
    );
    // PAYLOAD
    const payload = {
      roles: roles,
    }; // PRIVATE and PUBLIC key
    const signOptions = {
      issuer: 'Coffee.API',
      subject: 'Coffee.API',
      audience: 'Coffe.API.Users',
      expiresIn: Config.JWTExpiration(),
      algorithm: 'RS256',
    };
    let token: string;
    try {
      token = jsonWebToken.sign(payload, this.privateKEY, signOptions);
    } catch (err) {
      this.log.error(new LogMessage('JWT signing failed'), err);
    }
    return token;
  }

  verifyJWT(jwt: string): JWTResult {
    try {
      const result = jsonWebToken.verify(jwt, this.publicKEY);
      return { isValid: true, roles: result['roles'] as string[] };
    } catch (err) {
      return { isValid: false, roles: null };
    }
  }

  generateUUID() {
    return uuidGen.v4();
  }
}

export class JWTResult {
  isValid: boolean;
  roles: string[];
}
