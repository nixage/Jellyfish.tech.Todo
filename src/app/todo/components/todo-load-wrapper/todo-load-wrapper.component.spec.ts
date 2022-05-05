import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLoadWrapperComponent } from './todo-load-wrapper.component';

describe('TodoLoadWrapperComponent', () => {
  let component: TodoLoadWrapperComponent;
  let fixture: ComponentFixture<TodoLoadWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoLoadWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLoadWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
