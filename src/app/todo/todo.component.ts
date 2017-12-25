import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      console.log(res);
      this.todos = res as Todo[];
    }, err => {
      console.log(err);
    });
  }

}
