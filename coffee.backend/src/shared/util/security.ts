import crypto from 'crypto';
import * as jsonWebToken from 'jsonwebtoken';
import * as fs from 'fs';
import { CoffeeLogger } from './logger';
import { Config } from './config';
import { BackendError } from '../errors/backend.error';
import uuidGen = require('uuid');

export class CoffeeSecurity {
  private static readonly log = new CoffeeLogger(
    CoffeeSecurity.name,
    CoffeeSecurity.generateUUID(),
  );
  private static privateKEY: string;
  private static publicKEY: string;

  constructor() {
    try {
      CoffeeSecurity.privateKEY = fs.readFileSync(
        Config.JWTPrivateKeyPath(),
        'utf8',
      ); //use this to generate http://travistidwell.com/jsencrypt/demo/
      CoffeeSecurity.publicKEY = fs.readFileSync(
        Config.JWTPublicKeyPath(),
        'utf8',
      );
    } catch (err) {
      throw new BackendError(
        `Failed to load JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()} ${err}`,
      );
    }
    CoffeeSecurity.log.log(
      `Loaded JWT keys ${Config.JWTPrivateKeyPath()} ${Config.JWTPublicKeyPath()}`,
    );
  }

  static hash(raw: string) {
    const hash = crypto.createHash('sha256').update(raw).digest('hex');
    return hash;
  }
  static generateUUID() {
    return uuidGen.v4();
  }
  static signJWT(roles: string[]) {
    CoffeeSecurity.log.business(`Signing jwt with roles ${roles}`);
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
      token = jsonWebToken.sign(
        payload,
        CoffeeSecurity.privateKEY,
        signOptions,
      );
    } catch (err) {
      CoffeeSecurity.log.error('JWT signing failed', err);
    }
    return token;
  }

  static verifyJWT(jwt: string): JWTResult {
    try {
      const result = jsonWebToken.verify(jwt, CoffeeSecurity.publicKEY);
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
