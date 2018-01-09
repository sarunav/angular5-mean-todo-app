import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  serverUrl = '/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': this.authService.getToken()
  });

  login(userName: string, password: string): Observable<any> {
    let url = this.serverUrl + '/login';
    return this.http.post(url, { userName: userName, password: password })
    .map(res => res as User)
    .catch(err => {
      return Observable.throw(err);
    });
  }

  register(name: string, userName: string, password: string): Observable<any> {
    let url = this.serverUrl + '/user/register';
    return this.http.post(url, { name: name, userName: userName, password: password })
    .map(res => res as User)
    .catch(err => {
      return Observable.throw(err);
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get('/api/current-user', { headers: this.headers }).catch(err => {
      return Observable.throw(err);
});
  }

  logOut(): Observable<User> {
    console.log('from logout service');
    return this.http.post('/api/log-out', {}, { headers: this.headers })
    .map(res => res as User)
    .catch(err => {
      return Observable.throw(err);
});
  }

// logOut(){
//   localStorage.removeItem('accessToken');
// }

}
