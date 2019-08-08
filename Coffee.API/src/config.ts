export class Config {
    static Port(): Number {
        return process.env.PORT == undefined ? 3000 : Number(process.env.PORT);
    }
    static APIVersion(): string {
        return process.env.API_VERSION == undefined ? "v1" : (process.env.API_VERSION);
    }
    static JWTSecret(): string {
        return process.env.JWT_SECRET == undefined ? "EwT7yU85FYm2ptkMqNQt" : (process.env.JWT_SECRET);
    }
    static GetDBPath() {
        return process.env.DB_PATH == undefined ? "C:/temp/coffee.sqlite" : (process.env.DB_PATH);
    }
}
