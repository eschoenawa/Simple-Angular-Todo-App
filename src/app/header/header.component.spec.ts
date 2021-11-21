import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TodoService } from '../todo-service/todo.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatToolbarModule,
        MatButtonModule
      ],
      providers: [
        { provide: TodoService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the app title', () => {
    expect(fixture.nativeElement.querySelector('h1').innerText).toBe('Angular Todo App');
  });

  it(`should have a new-todo-button with text 'New'`, async () => {
    const addButton = await loader.getHarness(MatButtonHarness.with({text: 'New'}));
    const buttonText = await addButton.getText();
    expect(buttonText).toBe('New');
  });

  it('should call addTodo when the new-todo-button is clicked', async () => {
    let service = TestBed.inject(TodoService);
    let serviceAddTodoSpy = spyOn(service, 'addTodo');

    const addButton = await loader.getHarness(MatButtonHarness.with({text: 'New'}));
    await addButton.click();
    expect(serviceAddTodoSpy).toHaveBeenCalledTimes(1);
  });
});
