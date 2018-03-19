import { I18nActions } from './actions';

export interface I18NState {
  currentLanguage: string;
}

const INITIAL_I18N_STATE: any = {
  currentLanguage: null
};

export function i18nStateReducers() {
  return function reducer(state: I18NState = INITIAL_I18N_STATE,
                          action: any): I18NState {

    switch (action.type) {
      case I18nActions.LANGUAGE_CHANGED_DUMMY:

        console.log('action.payload:');
        console.log(action.payload);

        return {
          ...state,
          currentLanguage: state.currentLanguage === 'de' ? 'en' : 'de'
        };
    }

    return state;
  };
}
