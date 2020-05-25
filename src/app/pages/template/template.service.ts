/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Api } from '../../services/api/api.service';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class TemplateService {
    public apiUrl = ENV.pdfUrl;

    constructor(
        protected http: HttpClient,
        private router: Router,
        private api: Api
    ) {}

    createAuthorizationHeader(headers: HttpHeaders) {}

    get(url, data?): Observable<any> {
        console.log('GET' + this.apiUrl);
        const headers = new HttpHeaders();
        // this.createAuthorizationHeader(headers);

        const params: HttpParams = new HttpParams();
        if (data) {
            for (const key in data) {
                params.set(key, data[key]);
            }
        }

        return this.http
            .get(this.apiUrl + url, {
                headers: headers,
                params: params
            })
            .pipe(catchError(this.handleError));
    }

    post(url, data): Observable<any> {
        const headers = new HttpHeaders();
        // this.createAuthorizationHeader(headers);

        return this.http
            .post(url, data, {
                headers: headers
            })
            .pipe(catchError(this.handleError));
    }

    put(url, data): Observable<any> {
        const headers = new HttpHeaders();
        this.createAuthorizationHeader(headers);

        return this.http
            .put(this.apiUrl + url, data, {
                headers: headers
            })
            .pipe(catchError(this.handleError));
    }

    patch(url, data): Observable<any> {
        const headers = new HttpHeaders();
        // this.createAuthorizationHeader(headers);

        return this.http
            .patch(this.apiUrl + url, data, {
                headers: headers
            })
            .pipe(catchError(this.handleError));
    }

    delete(url): Observable<any> {
        const headers = new HttpHeaders();
        this.createAuthorizationHeader(headers);

        return this.http
            .delete(this.apiUrl + url, {
                headers: headers
            })
            .pipe(catchError(this.handleError));
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client side or network error occurred. Handle it accordingly
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: ${error.error}`
            );
        }
        return throwError('Something went wrong, try again later');
    }

    getTemplates() {}

    deleteTemplate(id): Observable<any> {
        return this.delete(`/Templates/${id}`).pipe(catchError(this.handleError));
    }

    downloadTemplate(url, data, token): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('token', token);

        return this.http
            .post(
                url,
                { data: data },
                {
                    headers: headers
                }
            )
            .pipe(catchError(this.handleError));
    }
}
