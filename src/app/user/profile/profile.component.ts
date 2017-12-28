import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User;
  
    constructor(
      private userService: UserService
    ) { }

    ngOnInit() {
      this.userService.getCurrentUser().subscribe(res => {
        console.log('Current user', res);
        this.user = res as User;
      }, err => {
        console.log(err);
      });
    }

}
