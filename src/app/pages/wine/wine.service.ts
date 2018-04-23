/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from 'services/api/api.service';

@Injectable()
export class WineService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getWineCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/Wines/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: ['type', 'priority DESC']
    };
    return this.api.get(`/Wines?filter=${JSON.stringify(filter)}`);
  }

  getWines(type, page = 1, pageSize = 20) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize,
      order: 'priority DESC',
      where: {
        type
      }
    };
    return this.api.get(`/Wines?filter=${JSON.stringify(filter)}`);
  }

  searchWines(type, key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` },
        type
      }
    };
    return this.api.get(`/Wines?filter=${JSON.stringify(filter)}`);
  }

  createWine(info) {
    return this.api.post('/Wines', info);
  }

  updateWine(id, info) {
    return this.api.patch(`/Wines/${id}`, info);
  }

  getWine(id) {
    const filter = {};
    return this.api.get(`/Wines/${id}?filter=${JSON.stringify(filter)}`);
  }

  deleteWine(id) {
    return this.api.delete(`/Wines/${id}`);
  }
}
