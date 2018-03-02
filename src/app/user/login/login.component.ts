import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {UserService} from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TodoService } from '../../todo/todo.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Toast } from 'angular2-toaster/src/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private todoService: TodoService,
    private router: Router,
    private toasterService: ToasterService
  ) { } 

  ngOnInit() {
  }

  onLogin(){
    console.log("Data: ", this.user);
    this.loading = true;
    let user = this.user;
    this.userService.login(user.userName, user.password)
    .subscribe(response => {
      console.log(response);

      let token = response.token;
      this.authService.setToken(token);
      console.log(token);
 
      var toastSuccess: Toast = {
        type: 'success',
        title: 'Success',
        body: response.message,
      };
      this.toasterService.pop(toastSuccess);

      this.loading = false;
      // redirect to profile page
      this.router.navigate(['/my-account']);

    }, err => {
      console.log(err);
      var toastErr: Toast = {
        type: 'error',
        title: 'Error',
        body: err.error.message,
      };
      this.toasterService.pop(toastErr);
    });
  }

}
