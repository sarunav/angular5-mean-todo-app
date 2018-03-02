import { AuthService } from './user/auth.service';
import { Component, OnInit  } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http/src/http_module';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'app';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // this.http.get('/api/todos').subscribe(data => {
    //   console.log(data);
    // });
     this.userService.getCurrentUser()
     .subscribe(data => {
       console.log(data);
     });
  }

  logOutUser() {
    this.userService.logOut()
    .subscribe(res => {
      console.log(res);
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

}
