import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get('/api/todos').catch(err => {
      return Observable.throw(err);
});
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get('/api/todo/' + id).map(res => res as Todo[])
    .catch(err => {
      return Observable.throw(err);
    });
  }
  }



