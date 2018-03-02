import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../todo.service';
import 'rxjs/add/operator/switchMap';
import { Todo } from '../todo';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Toast } from 'angular2-toaster/src/toast';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
  providers: [TodoService]
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo = new Todo();
  loading = false;

  constructor(
    private router: ActivatedRoute,
    protected todoService: TodoService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.router.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.todoService.getTodo(id);
    }).subscribe(response => {
      this.todo = response;
      this.loading = false;
      console.log(response);
          }, err => {
            this.loading = false;
            console.log(err);
          });
  }

  updateTodoStatus(id, name, note, completed) {
    this.todoService.editTodo(id, name, note, completed)
    .subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  saveEditedTodo() {
    this.loading = true;
    const newTodo = this.todo;
    this.todoService.editTodo(newTodo._id, newTodo.name, newTodo.note, newTodo.completed)
    .subscribe(response => {
      console.log(response);
      this.loading = false;
      // const toastSuccess: Toast = {
      //   type: 'success',
      //   title: 'Success',
      //   body: response,
      // };
      // this.toasterService.pop(toastSuccess);
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

}
