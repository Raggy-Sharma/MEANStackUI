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
  }

  startConnection(userName){
    this.socket = io(this.url, { query: `userId=${userName}` });
    // this.socket.emit('userName', userName);
  }

  sendMessage(message, username) {
    this.socket.emit('new-message', message, username);
  }

  getMessages(fromUser) {
    console.log('came')
    let observable = new Observable(observer => {
      // this.socket = io(this.url, { query: `userId=${fromUser}` });
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
