import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



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
    this.headers = {
      'Accept' : 'application/vnd.api+json',
      'Accept-Language': 'uk',
      'Content-Type' : 'application/vnd.api+json',
      'Content-Language' : 'uk'
    };
    this.options = new RequestOptions({ headers: this.headers });
  }

  getUsers(options?) : Observable<any> {
    console.log(options)
    let urlOptions: string;
    let sortOption: string = options.sort ? '&sort=' + encodeURIComponent(options.sort) : '';
    let countOption: string = options.count ? '&page[limit]=' + encodeURIComponent(options.count) : '';
    let offsetOption: string = options.offset ? '&page[offset]=' + encodeURIComponent(options.offset) : '';
    let filterOption: string = (options.filterType && options.filterValue) ? '&filter[' + encodeURIComponent(options.filterType) + ']=' + encodeURIComponent(options.filterValue) : '';
    urlOptions = sortOption + countOption + offsetOption + filterOption;
    return this.http
    .get(this.apiUrl + '?' + urlOptions, this.options).pipe(
    map( response => response['data']));
  }

  getUser(id): Observable<any> {
    return this.http
    .get(this.apiUrl + id, this.options).pipe(
    map( response => response['data']));
  }

  sortUsers(kind): Observable<any> {
    return this.http
    .get(this.apiUrl + '?sort=' + kind, this.options)
    .pipe(
      map( response => response['data'] )
    );
  }

  deleteUser(id): any {
    return this.http
    .delete(this.apiUrl + id, this.options)
    .subscribe();
  }

  changeUser(id, body): any {
    return this.http
    .patch(this.apiUrl + id, body, this.options)
    .subscribe();
  }

  addUser(body): any {
    this.http
    .post(this.apiUrl, body, this.options)
    .subscribe();
  }

}
