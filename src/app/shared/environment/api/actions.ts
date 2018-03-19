import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class EnvironmentActions {
  static readonly ENVIRONMENT_CONNECTED = 'ENVIRONMENT_CONNECTED';
  static readonly ENVIRONMENT_UAISMOBILE = 'ENVIRONMENT_UAISMOBILE';
  static readonly ENVIRONMENT_UAISTABLETPORTRAIT = 'ENVIRONMENT_UAISTABLETPORTRAIT';
  static readonly ENVIRONMENT_UACURRENTRESOLUTION = 'ENVIRONMENT_UACURRENTRESOLUTION';

  public isConnected = (payload: any): any => ({
    type: EnvironmentActions.ENVIRONMENT_CONNECTED,
    payload: payload
  })

  @dispatch()
  public uaIsMobile = (payload: any): any => ({
    type: EnvironmentActions.ENVIRONMENT_UAISMOBILE,
    payload: payload
  })

  @dispatch()
  public uaIsTabletPortrait = (payload: any): any => ({
    type: EnvironmentActions.ENVIRONMENT_UAISTABLETPORTRAIT,
    payload: payload
  })

  @dispatch()
  public uaCurrentResolution = (payload: any): any => ({
    type: EnvironmentActions.ENVIRONMENT_UACURRENTRESOLUTION,
    payload: payload
  })
}
