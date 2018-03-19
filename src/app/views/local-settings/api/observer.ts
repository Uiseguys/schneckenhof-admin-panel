import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Action } from 'redux';
import { LocalSettingsActions } from './actions';

@Injectable()
export class LocalSettingsObservers {

  constructor(private settingsActions: LocalSettingsActions) {}

}
