import { Injectable } from '@angular/core';
import { createEpicMiddleware } from 'redux-observable';
import { navigationMiddleware } from '../navigation/api/state';
import { diagnosticsMiddleware } from '../diagnostics/state';
import { NavigationObservers } from '../navigation/api/observer';
import { I18nObservers } from '../i18n/observer';
import { DashboardObservers } from '../../views/dashboard/api/observer';
import { ToDoObservers } from '../../features/todos/api/observer';
import { LocalSettingsObservers } from '../../views/local-settings/api/observer';

@Injectable()
export class Middlewares {
  constructor(
    private navigationObservers: NavigationObservers,
    private i18nObservers: I18nObservers,
    private dashboardObservers: DashboardObservers,
    private toDoObservers: ToDoObservers,
    private settingsObservers: LocalSettingsObservers
  ) {}

  public init() {
    return [
      // collect epics from feature modules
      navigationMiddleware,
      createEpicMiddleware(this.i18nObservers.createEpic()),
      createEpicMiddleware(this.navigationObservers.createEpic()),
      createEpicMiddleware(this.dashboardObservers.createEpic()),
      createEpicMiddleware(this.dashboardObservers.onSettingChange()),

      createEpicMiddleware(this.toDoObservers.onOverviewActivated()),
      createEpicMiddleware(this.toDoObservers.onDetailViewActivated()),
      createEpicMiddleware(this.toDoObservers.onCreateToDo()),
      createEpicMiddleware(this.toDoObservers.onUpdateToDo()),
      diagnosticsMiddleware // needs to be last
    ];
  }
}
