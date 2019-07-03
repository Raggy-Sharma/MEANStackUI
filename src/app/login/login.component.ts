import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeanStackAppService } from '../shared/services/meanStackApp.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public meanStackService: MeanStackAppService, private authService: AuthService, private router: Router) { }

  public loginForm: FormGroup

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.required])]
    });
  }


  onSubmit() {
    var body = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('passWord').value
    }
    this.meanStackService.postLogin(body).subscribe(res => {
      console.log(res)
      this.authService.setToken(res['token']);
      this.meanStackService.getUerProfile().subscribe(res => {
        this.router.navigate(['userProfile', res['user'].userName]).then((e) => {
          if (e) {
            console.log("Navigation is successful!");
          } else {
            console.log("Navigation has failed!");
          }
        });
      });
    }, err => {
      alert(err.error.message)
    })
  }

  onReset() {
    this.loginForm.reset()
  }

  navigate() {
    this.router.navigateByUrl('register');
  }

}
