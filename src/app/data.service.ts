import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  result: any;

  constructor(
    private http: HttpClient
  ) { }

  // let apiUrl = '/api/';

  getTodos() {
    return this.http.get('/api/todos')
    .subscribe(result => {
      this.result = result;
      console.log(result);
    });
  }

}
