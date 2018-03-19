import {
  NgModule,
  ApplicationRef,
  APP_INITIALIZER,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  I18NextModule,
  I18NEXT_SERVICE,
  ITranslationService
} from 'angular-i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';

/*
 * Platform and Environment providers/directives/pipes
 */
// import { ENV_PROVIDERS } from './environment';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { NavigationModule } from './shared/navigation/navigation.module';
import { StatusModule } from './shared/environment/environment.module';
import { I18nObservers } from './shared/i18n/observer';
import { I18nActions } from './shared/i18n/actions';
import { DashboardObservers } from './views/dashboard/api/observer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/authorization/token.interceptor';
import { AuthService } from './shared/authorization/authentication.service';
import { ToDoObservers } from './features/todos/api/observer';
import { LocalSettingsObservers } from './views/local-settings/api/observer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AsideNavComponent } from './views/dashboard/components/aside-nav/aside-nav.component';

const i18nextOptions = {
  whitelist: ['de', 'en'],
  fallbackLng: localStorage.getItem('lang') || 'en',
  debug: true, // set debug?
  returnEmptyString: false,
  ns: ['default'],
  defaultNS: 'default',
  backend: {
    loadPath: function(langs, ns) {
      // return 'assets/locales/{{lng}}.{{ns}}.json';
      return 'http://18.196.175.166:3000/api/Published/361c9e81-8d78-4fff-b53e-21cdc47846c8/{{lng}}/{{ns}}';
    }
  },
  interpolation: {
    format: I18NextModule.interpolationFormat()
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    cookieDomain: 'location.href.host'
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    const promise: Promise<any> = i18next // was    let promise: Promise<I18NextLoadResult> = i18next
      .use(i18nextXHRBackend)
      .use(i18nextLanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  declarations: [
    // app
    AppComponent,
    AsideNavComponent
  ],
  imports: [
    // import Angular's modules
    // core
    BrowserModule,
    FormsModule,
    // lib
    I18NextModule.forRoot(),
    NgbModule.forRoot(),
    // app
    ViewsModule,
    StatusModule,
    NavigationModule
  ],
  exports: [],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
    I18N_PROVIDERS,
    I18nObservers,
    DashboardObservers,
    ToDoObservers,
    I18nActions,
    LocalSettingsObservers,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: []
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
    console.log(appRef);
  }
}
