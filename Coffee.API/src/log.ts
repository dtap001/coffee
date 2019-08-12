import moment = require("moment");

export class Log {
    private static format(msg) {

        console.log(`${moment().toLocaleString()}-${msg} `);
    }
    static i(msg: string) {
        this.format(`INFO: ${msg} `);
    }

    static d(msg: string) {
        this.format(`DEBUG: ${msg} `);
    }
    static e(msg: string, error: any) {
        this.format(`ERROR: ${msg} Err: ${JSON.stringify(error)} `);
    }
}