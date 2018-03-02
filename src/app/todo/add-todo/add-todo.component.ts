import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo: Todo = new Todo;
  loading = false;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  addTodo(){
    let todo = this.todo;
    this.loading = true;
this.todoService.addTodo(todo.name, todo.note)
.subscribe(response => {
  this.loading = false;
  console.log(response);
  todo.name = '';
  todo.note = '';
}, err => {
  this.loading = false;
  console.log(err);
})
  }
}
