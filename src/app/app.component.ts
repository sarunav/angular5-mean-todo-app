import { Component, OnInit  } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http/src/http_module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'app';

  constructor(
    private http: HttpClient
  ) {
  }

  // ngOnInit(): void {
  //   this.http.get('/api/todos').subscribe(data => {
  //     console.log(data);
  //   });
  // }

}
