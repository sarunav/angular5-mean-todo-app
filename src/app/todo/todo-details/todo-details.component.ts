import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../todo.service';
import 'rxjs/add/operator/switchMap';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
  providers: [TodoService]
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo = new Todo();

  constructor(
    private router: ActivatedRoute,
    protected todoService: TodoService
  ) { }

  ngOnInit() {
    this.router.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.todoService.getTodo(id);
    }).subscribe(response => {
      this.todo = response;
      console.log(response);
          }, err => {
            console.log(err);
          });  
  }

  saveEditedTodo(){
    let newTodo = this.todo;
    this.todoService.editTodo(newTodo._id, newTodo.name, newTodo.note, newTodo.completed)
    .subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    })
  }

}
