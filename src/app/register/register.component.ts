import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeanStackAppService } from '.././shared/services/meanStackApp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public meanStackAppService: MeanStackAppService, private router: Router) { }

  public registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required])],
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.required])]
    });
  }
  onSubmit() {
    var body;
    body = {
      fullName: this.registerForm.get('fullName').value,
      email: this.registerForm.get('email').value,
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('passWord').value,

    }
    this.meanStackAppService.postRegister(body).subscribe(res => {
      console.log('res', res)
      alert('Successfully registered!');
      this.router.navigateByUrl('login')
    }, err => {
      console.log('err', err.error)
    })
  }
  onReset(){
    this.registerForm.reset();
  }

  navigate(){
    this.router.navigateByUrl('login');
  }
}
