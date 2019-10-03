import * as fs from 'fs';
import * as jwt from "jsonwebtoken";
import { Log } from './log';
export class CoffeeJWT {
    privateKEY = fs.readFileSync('./jwt/private.key', 'utf8');
    publicKEY = fs.readFileSync('./jwt/public.key', 'utf8');

    sign() {
        // PAYLOAD
        var payload = {
            data1: "Data 1",
            data2: "Data 2",
            data3: "Data 3",
            data4: "Data 4",
        };// PRIVATE and PUBLIC key
        var i = 'Mysoft corp';          // Issuer 
        var s = 'some@user.com';        // Subject 
        var a = 'http://mysoftcorp.in'; // Audience// SIGNING OPTIONS
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "12h",
            algorithm: "RS256"
        };
        var token ;
        try{
            token = jwt.sign(payload, this.privateKEY, signOptions);
    
        }catch(err){
            Log.e("jwt failed",err);
        }
         return token;
    }

    verify(token: string) {
        jwt.verify(token, this.publicKEY);
    }
}