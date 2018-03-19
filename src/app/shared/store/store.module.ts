import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { RootReducer } from './reducers';
import { Middlewares } from './middleware';
import { Enhancers } from './enhancers';

import { saveState } from '../localStorage/localStorage';

@NgModule({
  imports: [ NgReduxModule ],
  providers: [ Middlewares, Enhancers ],
})
export class StoreModule {
  constructor( public store: NgRedux<object>, middleware: Middlewares, enhancers: Enhancers) {
    store.configureStore( RootReducer, {}, middleware.init(), enhancers.init());

    store.subscribe(() => {
      const currentState: any = store.getState();
      saveState(
        'settings',
        currentState.settings
      );
    });
  }
}
