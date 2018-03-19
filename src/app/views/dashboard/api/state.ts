import { Action } from 'redux';
import { DashboardActions } from './actions';
import { DashbaordComponent } from '../dashboard.component';

export interface DashboardState {
  initialized: boolean;
  userData: any;
}

const INITIAL_DASHBOARD_STATE: any = {
  initialized: false
};

export function dashboardStateReducers() {
  return function reducer(state: DashboardState = INITIAL_DASHBOARD_STATE,
                          action: any): DashboardState {

    switch (action.type) {
      case DashboardActions.SETTINGS_MODIFIED:
        return {
          ...state,
          initialized: true
        };
    }
    switch (action.type) {
      case DashboardActions.DASHBOARD_INITIALIZED:
        return {
          ...state,
          initialized: false
        };
    }
    switch (action.type) {
      case DashboardActions.DASHBOARD_LOADED:
        return {
          ...state,
          initialized: true
        };
    }

    switch (action.type) {
      case DashboardActions.DASHBOARD_DESTROYED:
        return {
          ...state,
          initialized: false
        };
    }

    switch (action.type) {
      case DashboardActions.USER_DATA_MODIFIED: {
        return{
          ...state,
          initialized: true,
          userData: action.payload
        };
      }
    }

    return state;
  };
}
