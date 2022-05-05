import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {
  @Input() item: Todo = { completed: false, id: 0, title: '', userId: 0 };

  public loadDeleteItemTodo: boolean = false;

  constructor(
    private _todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public async onClickDeleteButton() {
    this.loadDeleteItemTodo = true;
    try {
      const res = await firstValueFrom(
        this._todoService.deleteTodo(this.item.id)
      );
      if (res) {
        this._snackBar.open('Todo item was successfully deleted', 'OK');
        this.loadDeleteItemTodo = false;
      }
    } catch (err) {
      this._snackBar.open('Somethig went wrong', 'ERROR');
      this.loadDeleteItemTodo = false;
    }
  }
}
