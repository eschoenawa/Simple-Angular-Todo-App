import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { TodoData } from '../data-classes/todo-data';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: TodoData[] = Array(0)
  private observer!: Observer<TodoData[]>
  private observable = new Observable<TodoData[]>(observer => {
    this.observer = observer
    this.observer.next(this.todos)
  })

  getTodos(): Observable<TodoData[]> {
    return this.observable
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done
    this.observer.next(this.todos)
  }

  renameTodo(index: number, newName: string) {
    this.todos[index].name = newName
    this.observer.next(this.todos)
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1)
    this.observer.next(this.todos)
  }

  addTodo() {
    this.todos.push(new TodoData("New Todo", false))
    this.observer.next(this.todos)
  }
}
