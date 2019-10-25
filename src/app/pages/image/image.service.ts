/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';
import { SettingsService } from '../../services/settings/settings.service';

@Injectable()
export class ImageService {
  constructor(
    private api: Api,
    private settings: SettingsService,
  ) { }

  // ---------- product api ----------
  getImageCount() {
    const filter = {
    };

    return this.api.get(`/resources/count?where=${JSON.stringify(filter)}`);
  }

  getAllImages() {
    return this.api.get(`/resources/all`);
  }

  deleteImage(id) {
    return this.api.delete(`/resources/${id}`);
  }
}
