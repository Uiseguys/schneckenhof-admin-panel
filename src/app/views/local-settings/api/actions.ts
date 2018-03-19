import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class LocalSettingsActions {
    static readonly COMPACT_VIEW_ACTIVATED = 'COMPACT_VIEW_ACTIVATED';
    static readonly COMPACT_VIEW_DEACTIVATED = 'COMPACT_VIEW_DEACTIVATED';

    @dispatch()
    public compactViewActivated = (): Action => ({
      type: LocalSettingsActions.COMPACT_VIEW_ACTIVATED
    })

    @dispatch()
    public compactViewDeactivated = (): Action => ({
      type: LocalSettingsActions.COMPACT_VIEW_DEACTIVATED
    })
}
