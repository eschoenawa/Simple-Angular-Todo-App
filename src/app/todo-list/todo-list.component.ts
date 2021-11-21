import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { TodoData } from '../data-classes/todo-data'
import { TodoService } from '../todo-service/todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: TodoData[] = Array(0)
  todoObservable!: Observable<TodoData[]>

  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    this.todoObservable = this._todoService.getTodos()
    this.getTodoData()
  }

  toggleTodoDone(index: number) {
    this._todoService.toggleDone(index)
  }

  renameTodo(index: number, newName: string) {
    this._todoService.renameTodo(index, newName)
  }

  deleteTodo(index: number) {
    this._todoService.deleteTodo(index)
  }

  getTodoData() {
    this.todoObservable.subscribe((todoData: TodoData[]) => {
      this.todos = todoData
    })
  }

  addTodo() {
    this._todoService.addTodo()
  }

}
