/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Api } from '../../services/api/api.service';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class TemplateService {
  public apiUrl = ENV.pdfUrl

  constructor(protected http: Http, private router: Router, private api: Api, ) { }

  createAuthorizationHeader(headers: Headers) { }

  get(url, data?) {
    console.log("GET" + this.apiUrl)
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    let params: URLSearchParams = new URLSearchParams();
    if (data) {
      for (var key in data) {
        params.set(key, data[key]);
      }
    }

    return this.http
      .get(this.apiUrl + url, {
        headers: headers,
        search: params
      })
      .map(res => res.json())
      .catch(this.handleError);
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .post(url, data, {
        headers: headers
      })
      .map(res => res.json())
      .catch(this.handleError);
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .put(this.apiUrl + url, data, {
        headers: headers
      })
      .map(res => res.json())
      .catch(this.handleError);
  }

  patch(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .patch(this.apiUrl + url, data, {
        headers: headers
      })
      .map(res => res.json())
      .catch(this.handleError);
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http
      .delete(this.apiUrl + url, {
        headers: headers
      })
      .map(res => res.json())
      .catch(this.handleError);
  }

  protected handleError(error: any) {
    return Observable.throw(error);
  }

  getTemplates() {
    return this.api.get('/Templates')
  }

  deleteTemplate(id) {
    return this.delete(`/Templates/${id}`);
  }

  downloadTemplate(url, data, token) {
    let headers = new Headers();
    headers.append('token',  token);
   
    return this.http
      .post(url, {data:data}, {
        headers: headers
      })
      .map(res => res.json())
      .catch(this.handleError);
  }


}
