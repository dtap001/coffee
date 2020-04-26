import { isNullOrUndefined } from "util";

export class Config {
    static IsDebug(): boolean {
        return true;
    }
    static Port(): Number {
        return isNullOrUndefined(process.env.PORT) ? 3000 : Number(process.env.PORT);
    }
    static APIVersion(): string {
        return isNullOrUndefined(process.env.API_VERSION) ? "/v1" : (process.env.API_VERSION);
    }
    static JWTSecret(): string {
        return isNullOrUndefined(process.env["coffe.token"]) ? "EwT7yU85FYm2ptkMqNQt" : (process.env["coffe.token"]);
    }
    static GetDBPath() {
        return isNullOrUndefined(process.env.DB_PATH) ? "C:/temp/coffee.sqlite" : (process.env.DB_PATH);
    }
}
