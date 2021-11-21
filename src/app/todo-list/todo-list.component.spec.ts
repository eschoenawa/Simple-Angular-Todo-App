import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TodoData } from '../data-classes/todo-data';
import { TodoService } from '../todo-service/todo.service';
import { TodoComponent } from '../todo/todo.component';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let loader: HarnessLoader;
  let testTodoData = [
    new TodoData("Putzen", false),
    new TodoData("Einkaufen", false),
    new TodoData("Vortrag vorbereiten", true)
  ];

  let todoService: TodoService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoComponent
      ],
      providers: [ {provide: TodoService}],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    todoService = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get todos from service', async () => {
    let getTodosSpy = spyOn(todoService, 'getTodos').and.returnValue(of(testTodoData));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.todos).toBe(testTodoData);
    expect(getTodosSpy).toHaveBeenCalledTimes(1);
    const cards = await loader.getAllHarnesses(MatCardHarness);
    expect(cards.length).toBe(testTodoData.length);
  });

  it('should show a card for each todo', async () => {
    spyOn(todoService, 'getTodos').and.returnValue(of(testTodoData));
    fixture.detectChanges();
    await fixture.whenStable();
    const cards = await loader.getAllHarnesses(MatCardHarness);
    expect(cards.length).toBe(testTodoData.length);
  });

  it('should add a todo when clicking the new button', async () => {
    let addTodoSpy = spyOn(todoService, 'addTodo');
    spyOn(todoService, 'getTodos').and.returnValue(of([]));
    const addButton = await loader.getHarness(MatButtonHarness.with({text: 'New'}));
    await addButton.click();
    expect(addTodoSpy).toHaveBeenCalledTimes(1);
  });
});
