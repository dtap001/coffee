import * as crypto from 'crypto';
import * as jsonWebToken from 'jsonwebtoken';
import * as fs from 'fs';
import { CoffeeLogger } from './logger';
import { Config } from './config';
import { Injectable } from '@nestjs/common';
import { GuidService } from '../edge/guid.service';
import { ErrorFactory } from '../errors/error.factory';

@Injectable()
export class CoffeeSecurity {
  private readonly log = new CoffeeLogger(CoffeeSecurity.name, this.guid.value);
  private privateKEY: string;
  private publicKEY: string;

  constructor(private guid: GuidService, private errorFactory: ErrorFactory) {}

  init() {
    try {
      this.privateKEY = fs.readFileSync(Config.JWTPrivateKeyPath(), 'utf8'); //use this to generate http://travistidwell.com/jsencrypt/demo/
      this.publicKEY = fs.readFileSync(Config.JWTPublicKeyPath(), 'utf8');
    } catch (err) {
      throw this.errorFactory.internalServerError(
        `${CoffeeSecurity.name}.constructor`,
        `Failed to load JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()}`,
        err,
      );
    }
    this.log.log(
      `Loaded JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()}`,
    );
  }

  hash(raw: string) {
    const hash = crypto.createHash('sha256').update(raw).digest('hex');
    return hash;
  }

  signJWT(roles: string[]) {
    this.log.business(
      `${CoffeeSecurity.name}:${this.signJWT.name}`,
      `Signing jwt with roles ${roles}`,
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
      this.log.error('JWT signing failed', err);
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
}

export class JWTResult {
  isValid: boolean;
  roles: string[];
}
