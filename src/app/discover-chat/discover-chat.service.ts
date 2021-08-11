import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscoverChatService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  sendMessageToRoom(username: string, room: string) {
    this.socket.emit('joinRoom', {username, room});
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getRoomAndUserInfo() {
    return this.socket.fromEvent('roomUsers');
  }
}
