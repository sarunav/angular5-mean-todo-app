import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Toast } from 'angular2-toaster/src/toast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  register: User = new User;
  loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
  }

  onSignup(){
    console.log('Signup data ', this.register);

    let register = this.register;
    this.loading = true;
    this.userService.register(register.name, register.userName, register.password)
    .subscribe(response => {
      console.log(response);

      var toastSuccess: Toast = {
        type: 'success',
        title: 'Success',
        body: response.message, 
      };  
      this.toasterService.pop(toastSuccess);
      this.loading = false;
      //redirect to profile page
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      var toastErr: Toast = {
        type: 'error',
        title: 'Error',
        body: err,  
      };   
      this.toasterService.pop(toastErr);
    });
  }

}
