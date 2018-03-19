import { Inject, Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import { Action } from 'redux';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { I18nActions } from './actions';

@Injectable()
export class I18nObservers {
  constructor(
    @Inject(I18NEXT_SERVICE) private translateI18Next: ITranslationService,
    private i18nActions: I18nActions
  ) {}

  private langLoadedSubscription: boolean;

  public changeLanguage(lang) {
    if (!this.langLoadedSubscription) {
      const that = this;
      this.translateI18Next.events.languageChanged.subscribe(newLang => {
        console.log('firing language changed newLang');
        console.log(newLang);
        that.i18nActions.languageChanged(newLang);
        this.i18nActions.languageChanged(newLang);
      });

      this.translateI18Next.events.loaded.subscribe(newStuff => {
        console.log('firing language loaded newLang');
        that.i18nActions.languageChanged(lang);
      });
      this.langLoadedSubscription = true;
    }

    this.translateI18Next.changeLanguage(lang);
  }

  public createEpic(): Epic<Action, any> {
    return (action$, store) =>
      action$
        .ofType('app/i18n/LANGUAGE_CHANGE')
        .do((action: any) => {
          this.changeLanguage(action.payload);
        })
        .mapTo({ type: 'app/i18n/LANGUAGE_CHANGED_DUMMY' });
  }
}
