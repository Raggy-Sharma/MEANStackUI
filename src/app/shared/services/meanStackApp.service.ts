import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeanStackAppService {

  constructor(public http: HttpClient) { }

  postRegister(body){
    console.log(environment.apiBaseUrl + '/register')
   return this.http.post(environment.apiBaseUrl + '/register', body);
  }

  postLogin(body){
    
  }

}
