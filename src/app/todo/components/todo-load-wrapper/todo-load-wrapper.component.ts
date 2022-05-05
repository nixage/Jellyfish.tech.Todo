import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-load-wrapper',
  templateUrl: './todo-load-wrapper.component.html',
  styleUrls: ['./todo-load-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoLoadWrapperComponent implements OnInit {
  public todo$: Observable<Todo[]> = this._todoService.getTodo(20);

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {}
}
