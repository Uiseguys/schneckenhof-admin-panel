import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

@Injectable()
export class I18nActions {
  static readonly LANGUAGE_CHANGE = 'app/i18n/LANGUAGE_CHANGE';
  static readonly LANGUAGE_CHANGED = 'app/i18n/LANGUAGE_CHANGED';
  static readonly LANGUAGE_CHANGED_DUMMY = 'app/i18n/LANGUAGE_CHANGED_DUMMY';

  @dispatch()
  languageChange = (payload: any): any => ({
    type: I18nActions.LANGUAGE_CHANGE,
    payload: payload
  })

  languageChanged = (payload: any): any => {
    console.log('in action dispatcher, payload');
    console.log(payload);
    return ({
      type: I18nActions.LANGUAGE_CHANGED,
      payload: payload
    });
  }

  languageChangedDummy = (payload: any): any => {
    console.log('in action dispatcher, payload dummy');
    console.log(payload);
    return ({
      type: I18nActions.LANGUAGE_CHANGED_DUMMY,
      payload: payload
    });
  }
}
