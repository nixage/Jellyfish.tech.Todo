import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoCreateItemDialogComponent } from '../todo-create-item-dialog/todo-create-item-dialog.component';

@Component({
  selector: 'app-todo-create-item',
  templateUrl: './todo-create-item.component.html',
  styleUrls: ['./todo-create-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateItemComponent implements OnInit {
  private _userId: number = 0;

  constructor(
    private _matDialog: MatDialog,
    private _todoService: TodoService
  ) {}

  ngOnInit(): void {
    this._loadUserId();
  }

  private async _loadUserId() {
    this._userId = await firstValueFrom(this._todoService.todoUserId$);
  }

  public onClickCreateItemButton() {
    this._matDialog.open(TodoCreateItemDialogComponent, {
      autoFocus: true,
      data: { userId: this._userId },
    });
  }
}
