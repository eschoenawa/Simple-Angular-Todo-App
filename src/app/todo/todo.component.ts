import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() name: string = "[NO NAME]"
  @Input() done: boolean = false
  @Output() doneToggled = new EventEmitter()
  @Output() nameChanged = new EventEmitter()
  @Output() deleted = new EventEmitter()

  nameTextFieldContent: string = ""

  expanded: boolean = false

  toggleDone() {
    this.doneToggled.emit()
  }

  toggleExpand() {
    this.expanded = !this.expanded
  }

  save() {
    this.nameChanged.emit({value: this.nameTextFieldContent})
    this.expanded = false
    this.nameTextFieldContent = ""
  }

  delete() {
    this.deleted.emit()
  }
}
