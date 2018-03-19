import { combineReducers } from 'redux';
import { dashboardStateReducers } from '../../views/dashboard/api/state';
import { navigationReducer  } from '../navigation/api/state';
import { environmentStateReducers} from '../environment/api/state';
import { i18nStateReducers } from '../i18n/state';
import { localSettingsReducers } from '../../views/local-settings/api/state';

import { todosStateReducers } from '../../features/todos/api/state';
import { featureId as toDoFeatureId } from '../../features/todos/index';


// Define the global store shape by combining our application's
// reducers together into a given structure.

const featureReducerMap = {};
featureReducerMap[toDoFeatureId] = todosStateReducers();

export const RootReducer = combineReducers({
  // collect here the reducers from the feature modules
  dashboard: dashboardStateReducers(),
  location: navigationReducer,
  i18n: i18nStateReducers(),
  settings: localSettingsReducers(),
  environment: environmentStateReducers(),
  ... featureReducerMap
});
