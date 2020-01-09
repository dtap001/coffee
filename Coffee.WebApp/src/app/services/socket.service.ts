import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';
import { TargetModel } from 'src/models/target.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: { origin: '*', transport: ['websocket'] } });
  }

  public dispatch(event: SocketEvent) {
    this.emit(event.TAG, event.data);
  }

  public subscribeToEvent(event: SocketEvent): Observable<any> {
    return this.fromEvent(event.TAG);
  }
}
export class SocketEvent {
  public TAG: string;
  public data: any;
}

export class ErrorDiscoveryEvent extends SocketEvent {
  constructor(network: string, error: string) {
    super();
    this.TAG = "Discovery|" + network + "|ERROR";
    this.data = error.toString();
  }
}

export class FoundDiscoveryEvent extends SocketEvent {
  constructor(network: string, found: TargetModel) {
    super();
    this.TAG = "Discovery|" + network + "|FOUND";
    this.data = found;
  }
}

export class EndDiscoveryEvent extends SocketEvent {
  constructor(network: string) {
    super();
    this.TAG = "Discovery|" + network + "|END";
  }
}

export class HelloEvent extends SocketEvent{
  constructor() {
    super();
    this.TAG = "Hello";
  }
}