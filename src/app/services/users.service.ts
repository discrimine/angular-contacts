import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string;
  private users: Array<User>;
  private headers: any;
  private options: any;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = 'http://angulartest.vivasg.com/human/';
    this.users = [];
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

  getUsers(options?): Observable<User[]> {
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
        map( (response: any) => {
          const users = [];
          response = response['data'];
          response.map( (user) => {
            const rUser = new User;
            rUser.id = user['id'];
            rUser.nameFirst = user['attributes']['name_first'];
            rUser.nameLast = user['attributes']['name_last'];
            rUser.birthday = user['attributes']['birthday'];
            rUser.email = user['attributes']['email'];
            users.push(rUser);
          });
          return users;
        }),
        catchError(this.errorHandler)
      );
    }

  getUser(id: number): Observable<User> {
    return this.http
    .get(this.apiUrl + id, this.options)
    .pipe(
      map( (response: any) => {
        response = response['data'];
        const rUser = new User;
        rUser.id = response['id'];
        rUser.nameFirst = response['attributes']['name_first'];
        rUser.nameLast = response['attributes']['name_last'];
        rUser.birthday = response['attributes']['birthday'];
        rUser.email = response['attributes']['email'];
        return rUser;
      }),
      catchError(this.errorHandler)
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http
    .delete(this.apiUrl + id, { headers: this.headers, observe: 'response' })
    .pipe(
      map( (response: any) => {
      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
      }),
      catchError(this.errorHandler)
    );
  }

  changeUser(id: number, body: string): Observable<User> {
    return this.http
    .patch(this.apiUrl + id, body, this.options)
    .pipe(
      map( (response: any) => {
        response = response['data'];
        const rUser = new User;
        rUser.id = response['id'];
        rUser.nameFirst = response['attributes']['name_first'];
        rUser.nameLast = response['attributes']['name_last'];
        rUser.birthday = response['attributes']['birthday'];
        rUser.email = response['attributes']['email'];
        return rUser;
      }),
      catchError(this.errorHandler)
    );
  }

  addUser(values): Observable<User>  {
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
      map( (response: any) => {
        response = response['data'];
        const rUser = new User;
        rUser.id = response['id'];
        rUser.nameFirst = response['attributes']['name_first'];
        rUser.nameLast = response['attributes']['name_last'];
        rUser.birthday = response['attributes']['birthday'];
        rUser.email = response['attributes']['email'];
        return rUser;
      }),
      catchError(this.errorHandler)
    );
  }
}
