import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000/userProfile';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(message, username) {
    console.log(this.socket.connected)
    this.socket.emit('new-message', message, username);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getTypeing() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getUserLoggedin(){
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('userLoggedIn', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  sendUsername(username){
    console.log(username)
    this.socket.emit('username', username);
  }

  sendTyping(username){
    this.socket.emit('typing', username);
  }
}
