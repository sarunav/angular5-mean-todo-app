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

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  addTodo(){
    let todo = this.todo;
this.todoService.addTodo(todo.name, todo.note)
.subscribe(response => {
  console.log(response);
}, err => {
  console.log(err);
})
  }
}
