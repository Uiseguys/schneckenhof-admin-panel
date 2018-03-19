import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import { Action } from 'redux';

@Injectable()
export class NavigationObservers {

  public createEpic(): Epic<Action, any> {
    return (action$) => action$
      .ofType('app/navigation/HOME')
      .mapTo({ type: 'app/navigation/DASHBOARD' });
  }
}
