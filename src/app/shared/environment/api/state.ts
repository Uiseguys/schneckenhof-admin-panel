import {EnvironmentActions} from './actions';

export interface EnvironmentState {
    connected: boolean;
    uaIsMobile: boolean;
    uaIsTabletPortrait: boolean;
    uaCurrentResolution: boolean;
}

const INITIAL_ENVIRONMENT_STATE: any = {
    connected: true,
    uaIsMobile: false,
    uaIsTabletPortrait: false,
    uaCurrentResolution: ''
};

export function environmentStateReducers() {
    return function reducer(state: EnvironmentState = INITIAL_ENVIRONMENT_STATE,
                            action: any): EnvironmentState {
        switch (action.type) {
            case EnvironmentActions.ENVIRONMENT_CONNECTED:
                return {
                    ...state,
                    connected: action.payload
                };
            case EnvironmentActions.ENVIRONMENT_UAISMOBILE:
                return {
                    ...state,
                    uaIsMobile: action.payload
                };
            case EnvironmentActions.ENVIRONMENT_UAISTABLETPORTRAIT:
                return {
                    ...state,
                    uaIsTabletPortrait: action.payload
                };
            case EnvironmentActions.ENVIRONMENT_UACURRENTRESOLUTION:
                return {
                    ...state,
                    uaCurrentResolution: action.payload
                };
        }

        return state;
    };
}
