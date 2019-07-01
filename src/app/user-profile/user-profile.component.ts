import { Component, OnInit } from '@angular/core';
import { MeanStackAppService } from '../shared/services/meanStackApp.service';
import { AuthService } from '../shared/services/auth.service';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private meanstackService: MeanStackAppService, private authSrvc: AuthService, public chatService: ChatService) { }

  fullName: string;
  userName: string;

  message;
  messages = [];
  typing = [];
  users = [];
  connection;

  ngOnInit() {
    this.meanstackService.getUerProfile().subscribe(res => {
      this.fullName = res['user'].fullName;
      this.userName = res['user'].userName;
      this.chatService.sendUsername(this.userName);
    }, err => {
      console.log(err)
    })



    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      console.log(this.messages)
    })
    this.connection = this.chatService.getTypeing().subscribe(message => {
      this.typing.push(message);
      setTimeout(() => {
        var i = this.typing.indexOf(message);
        this.typing.splice(i - 1, 1)
      }, 3000);
    });

    this.connection = this.chatService.getUserLoggedin().subscribe(user => {
      this.users.push(user);
      setTimeout(() => {
        var i = this.typing.indexOf(user);
        this.users.splice(i - 1, 1)
      }, 2000);
    })

  }

  sendMessage() {
    console.log(this.userName);
    this.chatService.sendMessage(this.message, this.userName);
    this.message = '';
  }

  onLogout() {
    this.authSrvc.logout();
    this.connection.unsubscribe();
  }

  sendTyping() {
    this.chatService.sendTyping(this.userName)
  }
}
