import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateItemDialogComponent } from './todo-create-item-dialog.component';

describe('TodoCreateItemDialogComponent', () => {
  let component: TodoCreateItemDialogComponent;
  let fixture: ComponentFixture<TodoCreateItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCreateItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
