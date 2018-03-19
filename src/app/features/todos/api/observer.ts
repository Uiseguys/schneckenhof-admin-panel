import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Action } from 'redux';
import { ToDoActions } from './actions';
import { HttpClient } from '@angular/common/http';
import { todoEndpoint } from '../index';
import { NgRedux } from '@angular-redux/store';

/*

  ToDosMiddleware

  Returns an "Epic", a redux observable listening to actions of specified type,
  doing asyncronous jobs and dispatches action(s) in response of the jobs

 */

@Injectable()
export class ToDoObservers {
  constructor(
    private toDoActions: ToDoActions,
    private ngRedux: NgRedux<object>,
    private http: HttpClient
  ) {}

  public onOverviewActivated(): Epic<Action, any> {
    return (action$, store) =>
      action$
        .ofType(ToDoActions.OVERVIEW_ACTIVATED)
        .mergeMap(action =>
          this.http
            .request('GET', todoEndpoint)
            .map(response => this.toDoActions.collectionDataReceived(response))
        );
  }

  public onDetailViewActivated(): Epic<any, any> {
    return (action$, store) =>
      action$
        .ofType(ToDoActions.DETAIL_VIEW_ACTIVATED)
        .mergeMap(action =>
          this.http
            .request('GET', todoEndpoint + '/' + action.payload)
            .map(response => this.toDoActions.detailDataReceived(response))
        );
  }

  public onCreateToDo(): Epic<any, any> {
    return (action$, store) =>
      action$.ofType(ToDoActions.CREATE_TODO).mergeMap(action =>
        this.http.post(todoEndpoint, action.payload).map(response =>
          this.ngRedux.dispatch({
            type: 'app/navigation/TODOS'
          })
        )
      );
  }

  public onUpdateToDo(): Epic<any, any> {
    return (action$, store) =>
      action$.ofType(ToDoActions.UPDATE_TODO).mergeMap(action =>
        this.http
          .put(`${todoEndpoint}/${action.payload.id}`, action.payload.values)
          .map(response =>
            this.ngRedux.dispatch({
              type: 'app/navigation/TODOS'
            })
          )
      );
  }
}
