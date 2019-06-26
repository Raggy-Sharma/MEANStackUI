import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) { }

  public loginForm: FormGroup

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.required])]
    });
  }

}
