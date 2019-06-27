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

  ngOnInit() {
    this.meanstackService.getUerProfile().subscribe(res => {
      this.fullName = res['user'].fullName;
      this.userName = res['user'].userName;
    }, err => {
      console.log(err)
    })
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
  }

  onLogout(){
    this.authSrvc.logout();
  }

}
