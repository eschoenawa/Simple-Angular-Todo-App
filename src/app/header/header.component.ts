import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo-service/todo.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <h1>Angular Todo App</h1>
      <span class="spacer"></span>
      <button mat-button (click)="newTodo()">New</button>
    </mat-toolbar>
  `,
  styles: ['.spacer {flex: 1 1 auto;}']
})
export class HeaderComponent {

  constructor(private _todoService: TodoService) { }

  newTodo() {
    this._todoService.addTodo()
  }

}
