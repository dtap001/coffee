import moment = require("moment");
import { Config } from "./config";

export class Log {
    private static format(msg) {

        console.log(`${moment().toLocaleString()}-${msg} `);
    }
    static i(msg: string) {
        this.format(`INFO: ${msg} `);
    }

    static d(msg: string) {
        if(Config.IsDebug()){return;}
        this.format(`DEBUG: ${msg} `);
    }
    static e(msg: string, error: any) {
        if (error) {
            this.format(`ERROR: ${msg} Err: ${JSON.stringify(error)} `);
            return;
        }
        this.format(`ERROR: ${msg}`);

    }
}