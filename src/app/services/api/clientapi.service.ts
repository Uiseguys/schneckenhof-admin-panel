/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Api } from './api.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ClientApiService extends Api {
  private transactionObserver = new Subject();
  private transactionRefresher;

  // ---------- auth api ----------
  login(info) {
    return this.post('/CustomUsers/login', info);
  }

  register(info) {
    return this.post('/CustomUsers', info);
  }

  logout() {
    return this.post('/CustomUsers/logout', {});
  }

  getUserInfo(id) {
    const filter = {
      include: ['roles']
    };

    return this.get(`/CustomUsers/${id}?filter=${JSON.stringify(filter)}`);
  }

  generatePDF(template, data) {
    return this.http
      .post(
        `http://localhost:4000?template=${encodeURIComponent(template)}`,
        // `https://www.pdf-aas.io/?template=${encodeURIComponent(template)}`,
        data,
        {}
      )
      .map((res: any) => `http://localhost:4000/${res._body}`);
  }

  // admiring-clarke-b6eff4.netlify.com
  buildPreviewSite() {
    return this.http
      .post('https://api.netlify.com/build_hooks/5afad506c965923950641398', {})
      .catch(this.handleError);
  }

  //
  buildLiveSite() {
    return this.http
      .post('https://api.netlify.com/build_hooks/5ad6d48ac965925822f5aae2', {})
      .catch(this.handleError);
  }
}
