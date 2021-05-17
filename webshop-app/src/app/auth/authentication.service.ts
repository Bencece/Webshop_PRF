import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    return this.http.post(environment.serverUrl + '/login', {name: name, password: password}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  logout() {
    return this.http.post(environment.serverUrl + '/logout', 
    {withCredentials: true, responseType: 'text'});
  }
}
