import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import { User } from './user.model';
import { ResponseData } from './response-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string;
  private users: any;
  private headers: any;
  private options: any;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = 'http://angulartest.vivasg.com/human/';
    this.users = undefined;
    this.headers = new HttpHeaders({
      'Accept' : 'application/vnd.api+json',
      'Accept-Language': 'uk',
      'Content-Type' : 'application/vnd.api+json',
      'Content-Language': 'uk',
    });
    this.options = { headers: this.headers };
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }

  getUsers(options?): Observable<ResponseData> {
    const urlOptions: string[] = [];
    if (options.sort) {
      urlOptions.push('sort=' + encodeURIComponent(options.sort));
    }
    if (options.count) {
      urlOptions.push('page[limit]=' + encodeURIComponent(options.count));
    }
    if (options.offset) {
      urlOptions.push('page[offset]=' + encodeURIComponent(options.offset));
    }
    if (options.filterType && options.filterValue) {
      urlOptions.push('filter[' + encodeURIComponent(options.filterType) + ']=' + encodeURIComponent(options.filterValue));
    }
    return this.http
      .get(this.apiUrl + '?' + urlOptions.join('&'), this.options)
      .pipe(
        map( response => response['data'])
      )
      .catch(this.errorHandler);
    }

  getUser(id: number): Observable<User> {
    return this.http
    .get(this.apiUrl + id, this.options)
    .pipe(
      map( response => response['data']['attributes']),
    )
    .catch(this.errorHandler);
  }

  deleteUser(id: number): Observable<any> {
    return this.http
    .delete(this.apiUrl + id, this.options)
    .catch(this.errorHandler);
  }

  changeUser(id: number, body: string): Observable<any> {
    return this.http
    .patch(this.apiUrl + id, body, this.options)
    .catch(this.errorHandler);
  }

  addUser(values): Observable<any>  {
    const body = JSON.stringify({
      'data' : {
        'type' : 'human',
        'attributes' : {
          'name_first' : values.nameFirst,
          'name_last' : values.nameLast,
          'birthday' : values.birthday,
          'email' : values.email
        }
      }
    });
    return this.http
    .post(this.apiUrl, body, this.options)
    .pipe(
      catchError(this.errorHandler)
    );
  }
}
