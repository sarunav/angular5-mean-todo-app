import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';
declare var swal: any;

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

  updateTodoStatus(id, name, note, completed){
    this.todoService.editTodo(id, name, note, completed)
    .subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    })
  }

  deleteTodo(todo){
    let self = this;

    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success',
          self.todoService.deleteTodo(todo)
              .subscribe(res => {
                console.log('Todo deleted');
            }, err => {
              console.log(err);
            })
        )
      }
    })
};

}
