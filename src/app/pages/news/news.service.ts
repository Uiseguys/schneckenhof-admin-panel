/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";

@Injectable()
export class NewsService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getNewsCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/news/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: ["type", "startDate ASC"]
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  getNews(type) {
    const filter = {
      order: "startDate ASC",
      where: {
        type
      }
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  searchNews(type, key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` },
        type
      },
      order: ["startDate ASC"]
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  createNews(info) {
    return this.api.post("/news", info);
  }

  updateNews(id, info) {
    return this.api.patch(`/news/${id}`, info);
  }

  getSingleNews(id) {
    const filter = {};
    return this.api.get(`/news/${id}?filter=${JSON.stringify(filter)}`);
  }

  deleteNews(id) {
    return this.api.delete(`/news/${id}`);
  }
}
