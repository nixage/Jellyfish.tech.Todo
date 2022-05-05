import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-create-item-dialog',
  templateUrl: './todo-create-item-dialog.component.html',
  styleUrls: ['./todo-create-item-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateItemDialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    completed: new FormControl(false),
  });

  public loadCreateItemTodo: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<TodoCreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: { userId: number },
    private _todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.f['userId'].setValue(this._dialogData.userId);
  }

  public get f() {
    return this.form.controls;
  }

  public async onSubmit() {
    this.loadCreateItemTodo = true;
    const value: Pick<Todo, 'title' | 'userId' | 'completed'> = this.form.value;

    try {
      const res = await firstValueFrom(this._todoService.createTodo(value));
      if (res) {
        this._snackBar.open('Todo item was successfully created', 'OK');
        this._dialogRef.close();
      }
      this.loadCreateItemTodo = false;
    } catch (err) {
      this.loadCreateItemTodo = false;
      this._snackBar.open('Somethig went wrong', 'ERROR');
    }
  }
}
