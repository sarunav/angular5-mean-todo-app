import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Todo } from './todo';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  headers = new HttpHeaders({
    'Content-type':'application/json',
    'x-access-token': this.authService.getToken()
  })

  getTodos(): Observable<Todo[]> {
    console.log(this.headers)
    return this.http.get('/api/todos', {headers: this.headers}).catch(err => {
      return Observable.throw(err);
});
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get('/api/todo/' + id, {headers: this.headers}).map(res => res as Todo[])
    .catch(err => {
      return Observable.throw(err);
    });
  }
  }



