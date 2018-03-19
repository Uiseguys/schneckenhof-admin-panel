import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class NavigationActions {
  static readonly HOME = 'app/navigation/GO_HOME';

  @dispatch()
  goHome = (): Action => ({
    type: NavigationActions.HOME
  })
}
