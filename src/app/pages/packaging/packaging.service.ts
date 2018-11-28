/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';

@Injectable()
export class PackagingService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getPackagingCount() {
    const filter = {
      completed: { neq: null }
    };

    return this.api.get(`/Packagings/count?where=${JSON.stringify(filter)}`);
  }

  getPackagings(page = 1, pageSize = 500) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize,
      packaging: 'completed DESC',
      where: {
        completed: { neq: null }
      }
    };
    return this.api.get(`/Packagings?filter=${JSON.stringify(filter)}`);
  }

  createPackaging(info) {
    return this.api.post('/Packagings', info);
  }

  updatePackaging(id, info) {
    return this.api.patch(`/Packagings/${id}`, info);
  }

  getPackaging(id) {
    const filter = {};
    return this.api.get(`/Packagings/${id}?filter=${JSON.stringify(filter)}`);
  }

  deletePackaging(id) {
    return this.api.delete(`/Packagings/${id}`);
  }
}
