import * as evilscan from "evilscan";
import { injectable } from "inversify";
import container from "./diContainer";
import { SocketServer } from "./socketServer";
import TYPES from "./types";
import { Target } from "./models/target";

export class DiscoveryEvents {
    public static ERROR = "ERROR";
    public static FOUND = "FOUND";
    public static END = "END";
}
@injectable()
export class DiscoveryManager {
    static scan(network: string) {
        let options = {
            target: network,
            port: '21',
            status: 'TROU', // Timeout, Refused, Open, Unreachable
            banner: true
        };
        let scanner = new evilscan(options);

        scanner.on('result', function (data) {
            // fired when item is matching options
            console.log(data);
            let socket = container.get<SocketServer>(TYPES.SocketServer);
            let found = new Target();
            found.caption = data.banner;
            found.ipAddress = data.ip;
            socket.emitFound(found);
        });

        scanner.on('error', function (err) {
            let socket = container.get<SocketServer>(TYPES.SocketServer);
            socket.emitError(err.toString());
        });

        scanner.on('done', function () {
            let socket = container.get<SocketServer>(TYPES.SocketServer);
            socket.emitEnd();
        });

        scanner.run();
    }
}