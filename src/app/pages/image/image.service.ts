/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Api } from '../../services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../../services/settings/settings.service';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Injectable()
export class ImageService {
    constructor(
        private api: Api,
        private http: HttpClient,
        private settings: SettingsService,
        private cloudinary: Cloudinary
    ) {}

    // ---------- product api ----------
    getImageCount(): Observable<any> {
        const filter = {};
        return this.http
            .get('https://res.cloudinary.com/schneckenhof/image/list/wines.json')
            .pipe(
                map(res => {
                    const arr = res['resources'] || [];
                    return arr.length;
                })
            );
    }

    getAllImages(page = 1, pageSize = 500): Observable<any> {
        return this.http
            .get('https://res.cloudinary.com/schneckenhof/image/list/wines.json')
            .pipe(
                map(res => {
                    let arr = res['resources'] || [];
                    if (arr.length > 0) {
                        arr = arr.map(res2 => ({
                            public_id: res2.public_id,
                            url: this.cloudinary.cloudinaryInstance.url(res2.public_id)
                        }));
                    }
                    return arr;
                })
            );
    }

    deleteImage(id): Observable<any> {
        return this.api.delete(`/resources/${id}`);
    }
}
