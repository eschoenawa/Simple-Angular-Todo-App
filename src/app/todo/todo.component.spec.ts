import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing'

import { TodoComponent } from './todo.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
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
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.name = "Test Todo";
    component.done = false;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show todo name', async () => {
    const card = await loader.getHarness(MatCardHarness.with({title: "Test Todo"}));
    const name = await card.getTitleText();
    expect(name).toBe("Test Todo");
  });

  it('should toggle done when checkbox is clicked', async() => {
    const eventSpy = spyOn(component.doneToggled, "emit");
    const checkbox = await loader.getHarness(MatCheckboxHarness);
    await checkbox.toggle();
    expect(component.done).toBeTrue();
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it('should expand when card is clicked', async () => {
    const card = await loader.getHarness(MatCardHarness.with({title: "Test Todo"}));
    expect(component.expanded).toBeFalse();
    await (await card.host()).click();
    expect(component.expanded).toBeTrue();
    const saveButton = await loader.getHarness(MatButtonHarness);
    expect(saveButton).toBeTruthy();
  });
});
