import { Injectable } from '@angular/core';
import { User } from './user';
import { isNullOrUndefined } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  setUser(user: User) {
    console.log('from auth: ', user.userName);
    let userString = JSON.stringify(user);
    localStorage.setItem('Current User:', userString);
  }

  getCurrentUser(): User {
    let userString = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(userString)) {
      let user: User = JSON.parse(userString);
      console.log('From getCurrent user method: ', user)
      return user;
    }else {
      return null;
    }
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  getLoggedInUser(user: User) {
    let userString = JSON.stringify(user);
    console.log('Loggedin user: ', userString);
}

isAuthenticated() {
  return this.getToken() != null;
}

  }


