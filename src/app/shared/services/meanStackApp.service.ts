import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeanStackAppService {

  constructor(public http: HttpClient) { }

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})}


  postRegister(body) {
    console.log(environment.apiBaseUrl + '/register')
    return this.http.post(environment.apiBaseUrl + '/register', body, this.noAuthHeader);
  }

  postLogin(body) {
    console.log(environment.apiBaseUrl + '/authenticate')
    return this.http.post(environment.apiBaseUrl + '/authenticate', body, this.noAuthHeader);
  }

  getUerProfile(){
    return this.http.get(environment.apiBaseUrl +'/userProfile')
  }

}
