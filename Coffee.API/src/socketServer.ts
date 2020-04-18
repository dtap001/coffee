import { Log } from "./log";

import socketIo from 'socket.io';
import { Server } from "http";
import { injectable } from "inversify";

@injectable()
export class SocketServer {
    private socket: SocketIO.Server;
    initialize(server: Server) {
        this.socket = socketIo(server);
        this.socket.on('connection', sckt => {
            Log.i('New client connected');
            sckt.on(new HelloEvent().TAG, () => {
                Log.i('Hello received from client');
            })
            sckt.on('disconnect', () => {
                Log.i('Client disconnected');
            });
        });
    }
    emit(event: SocketEvent) {
        this.socket.emit(event.TAG, event.data);
    }
}
export class SocketEvent {
    public TAG: string;
    public data: any;
}
export class HelloEvent extends SocketEvent {
    constructor() {
        super();
        this.TAG = "Hello";
    }
}