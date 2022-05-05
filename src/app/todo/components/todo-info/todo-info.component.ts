import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInfoComponent implements OnInit {
  public todoLength$: Observable<number> = this._todoService.todoLength$;

  public todoCompletedLength$: Observable<number> =
    this._todoService.todoCompletedLength$;

  public todoUnCompletedLength$: Observable<number> =
    this._todoService.todoUnCompletedLength$;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {}
}
