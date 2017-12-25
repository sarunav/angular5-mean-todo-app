import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoService } from './todo/todo.service';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { TodoComponent } from '../app/todo/todo.component';
import { TodoDetailsComponent } from './todo/todo-details/todo-details.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todos', component: TodoComponent },
  { path: 'todo/:id', component: TodoDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
