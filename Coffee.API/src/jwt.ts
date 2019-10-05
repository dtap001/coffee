import * as fs from 'fs';
import * as jwt from "jsonwebtoken";
import { Log } from './log';
import { injectable } from 'inversify';
@injectable()
export class CoffeeJWT {
    privateKEY = fs.readFileSync('./jwt/private.key', 'utf8'); //use this to generate http://travistidwell.com/jsencrypt/demo/
    publicKEY = fs.readFileSync('./jwt/public.key', 'utf8');

    sign(roles: string[]) {
        // PAYLOAD
        var payload = {
            roles: roles
        };// PRIVATE and PUBLIC key
        var signOptions = {
            issuer: 'Coffee.API',
            subject: "Coffee.API",
            audience: "Coffe.API.Users",
            expiresIn: "2h",
            algorithm: "RS256"
        };
        var token;
        try {
            token = jwt.sign(payload, this.privateKEY, signOptions);

        } catch (err) {
            Log.e("jwt failed", err);
        }
        return token;
    }

    verify(token: string): JWTResult {
        try {
            let result = jwt.verify(token, this.publicKEY);
            return { isValid: true, roles: result["roles"] as string[] };
        } catch (err) {
            return { isValid: false, roles: null };
        }
    }
}

export class JWTResult {
    isValid: boolean;
    roles: string[];
}