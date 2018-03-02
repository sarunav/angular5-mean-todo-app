import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './todo/todo.service';
import { AuthService } from './user/auth.service';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { TodoComponent } from '../app/todo/todo.component';
import { TodoDetailsComponent } from './todo/todo-details/todo-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserService } from './user/user.service';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { AuthGuardService } from './user/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'todo/:id', component: TodoDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'add-todo', component: AddTodoComponent, canActivate: [AuthGuardService] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDetailsComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToasterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [TodoService, AuthService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
