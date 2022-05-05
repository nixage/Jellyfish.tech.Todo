import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todoListSubject: Subject<Todo[]> = new Subject();
  private _todoList: Todo[] = [];
  public todoList$: Observable<Todo[]> = this._todoListSubject
    .asObservable()
    .pipe(tap((data) => (this._todoList = data)));

  public todoUserId$: Observable<number> = this._todoListSubject
    .asObservable()
    .pipe(map((data) => data[0].userId));

  public todoLength$: Observable<number> = this.todoList$.pipe(
    map((data) => data.length)
  );
  public todoCompletedLength$: Observable<number> = this.todoList$.pipe(
    map((data) => data.filter((todo) => todo.completed).length)
  );
  public todoUnCompletedLength$: Observable<number> = this.todoList$.pipe(
    map((data) => data.filter((todo) => !todo.completed).length)
  );

  constructor(private _http: HttpClient) {}

  public getTodo(limit: number) {
    return this._getTodo(limit);
  }
  private _getTodo(limit: number) {
    return this._http
      .get<Todo[]>(`${environment.api}/todos?_limit=${limit}`)
      .pipe(tap((data) => this._todoListSubject.next(data)));
  }

  public createTodo(todo: Pick<Todo, 'title' | 'userId' | 'completed'>) {
    return this._createTodo(todo);
  }
  private _createTodo(todo: Pick<Todo, 'title' | 'userId' | 'completed'>) {
    return this._http
      .post<Todo>(`${environment.api}/todos`, todo)
      .pipe(
        tap((newTodo) =>
          this._todoListSubject.next([newTodo, ...this._todoList])
        )
      );
  }

  public deleteTodo(id: number) {
    return this._deleteTodo(id);
  }
  private _deleteTodo(id: number) {
    return this._http.delete<boolean>(`${environment.api}/todos/${id}`).pipe(
      map(() => {
        this._todoListSubject.next(
          this._todoList.filter((val) => +val.id !== +id)
        );
        return true;
      })
    );
  }
}
