import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class DashboardActions {
  static readonly DASHBOARD_INITIALIZED = 'DASHBOARD_INITIALIZED';
  static readonly DASHBOARD_LOADED = 'DASHBOARD_LOADED';
  static readonly DASHBOARD_DESTROYED = 'DASHBOARD_DESTROYED';
  static readonly SETTINGS_MODIFIED = 'app/dashboard/settings-modified';
  static readonly DATA_RECEIVED = 'app/dashboard/DATA_RECEIVED';
  static readonly USER_DATA_MODIFIED = 'app/dashboard/USER_DATA_MODIFIED';

  @dispatch()
  public dashboardInitialized = (): Action => ({
    type: DashboardActions.DASHBOARD_INITIALIZED
  })

  @dispatch()
  public dashboardLoaded = (): Action => ({
    type: DashboardActions.DASHBOARD_LOADED
  })

  public dashboardDestroyed = (): Action => ({
    type: DashboardActions.DASHBOARD_DESTROYED
  })
/*
  @dispatch()
  public settingsModified = (payload: any): any => ({
    type: DashboardActions.SETTINGS_MODIFIED,
    payload : payload
  })*/

  @dispatch()
  public settingsModified = (payload: any): any => ({
    type: DashboardActions.USER_DATA_MODIFIED,
    payload : payload
  })

  public dataReceived = (payload: any): any => ({
    type: DashboardActions.DATA_RECEIVED,
    payload: payload
  })

}
