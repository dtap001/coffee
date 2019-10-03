export class Config {
    static IsDebug(): boolean {
        return true;
    }
    static Port(): Number {
        return process.env.PORT == undefined ? 3000 : Number(process.env.PORT);
    }
    static APIVersion(): string {
        return process.env.API_VERSION == undefined ? "/v1" : (process.env.API_VERSION);
    }
    static JWTSecret(): string {
        return process.env["coffe.token"] == undefined ? "EwT7yU85FYm2ptkMqNQt" : (process.env["coffe.token"]);
    }
    static GetDBPath() {
        return process.env.DB_PATH == undefined ? "C:/temp/coffee.sqlite" : (process.env.DB_PATH);
    }
}
