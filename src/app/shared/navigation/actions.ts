import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class NavigationActions {
  static readonly NAVIGATION_TRIGGERED = 'app/navigation/triggered';
  static readonly COMPONENT_LOADED = 'app/navigation/component-loaded';

  @dispatch()
  navigationTriggered = (): Action => ({
    type: NavigationActions.NAVIGATION_TRIGGERED
  })

  componentLoaded = (): Action => ({
    type: NavigationActions.COMPONENT_LOADED
  })

}
