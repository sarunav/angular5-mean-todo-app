import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {};

    constructor(
      private userService: UserService,
      private authService: AuthService,
      private todoService: TodoService
    ) { }

    ngOnInit() {
      this.userService.getCurrentUser()
      .subscribe(res => {
        console.log('Current user', res);
        // this.user = res;
        this.user = res as User;
      }, err => {
        console.log(err);
      });
    }

    // currentUser(){
    //   this.userService.getCurrentUser()
    //   .subscribe(res => {
    //     console.log('Current user', res);
    //     this.user = res as User;
    //   }, err => {
    //     console.log(err);
    //   });
    // }

}
