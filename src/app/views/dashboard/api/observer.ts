import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Action } from 'redux';
import { DashboardActions } from './actions';

@Injectable()
export class DashboardObservers {

  constructor(
      private dashboardActions: DashboardActions,
  ) {}

  public createEpic(): Epic<any, any> {
    return (action$, store) => action$
      .ofType(DashboardActions.DASHBOARD_INITIALIZED)
        .mapTo({ type:  DashboardActions.DASHBOARD_LOADED });
  }

  public onSettingChange(): Epic<any, any> {
    return(action$, store) => action$
    .ofType(DashboardActions.SETTINGS_MODIFIED)
    .mapTo({
      type: DashboardActions.USER_DATA_MODIFIED
    });
  }

}


