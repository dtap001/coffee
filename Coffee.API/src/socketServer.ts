import { Log } from "./log";

import socketIo from 'socket.io';
import { Server } from "http";
import { DiscoveryEvents } from "./discovery.manager";
import { Target } from "./models/target";
export class SocketServer {
    private socket: SocketIO.Server;
    constructor(server: Server) {
        this.socket = socketIo(server);
        this.socket.on('connection', sckt => {
            Log.i('New client connected');

            /*  socket.on('todoCreated', (todo) => {
                  io.sockets.emit('todoCreated', todo);
              });*/

            sckt.on('disconnect', () => {
                Log.i('Client disconnected');
            });
        });
    }

    emitError(err: string) {
        this.socket.emit(DiscoveryEvents.ERROR, err);
    }
    emitEnd() {
        this.socket.emit(DiscoveryEvents.END);
    }
    emitFound(found: Target) {
        this.socket.emit(DiscoveryEvents.FOUND, found);
    }
}
