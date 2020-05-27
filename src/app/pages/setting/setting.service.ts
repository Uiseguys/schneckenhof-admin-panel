/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Api } from '../../services/api/api.service';

@Injectable()
export class SettingService {
    constructor(private api: Api) {}

    getAll(): Observable<any> {
        return this.api.get('/settings');
    }

    getSetting(key): Observable<any> {
        const filter = {
            filter: JSON.stringify({
                where: { key }
            })
        };
        return this.api.get('/settings', filter);
    }

    deleteSetting(id) {
        console.log('This has been fired');
        return this.api.delete(`/settings/${id}`);
    }

    updateSetting(key, value): Observable<any> {
        const where = { key };
        return this.api.post(`/settings?where=${JSON.stringify(where)}`, {
            key,
            value
        });
    }
}
