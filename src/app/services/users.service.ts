import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string;
  private users: any;
  private headers: any;
  private options: any;

  constructor(private http: Http, private router: Router) {
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

  getUsers(sort, count, offset, filterType?, filterValue?) {
    let urlOptions = '';
    urlOptions = 'sort=' + sort + '&page[limit]=' + count + '&page[offset]=' + offset + '&filter[' + filterType + ']=' + filterValue;
    return this.http
    .get(this.apiUrl + '?' + urlOptions, this.options)
    .map( response => response.json())
    .map( response => response.data);
  }

  getUser(id) {
    return this.http
    .get(this.apiUrl + id, this.options)
    .map( response => response.json())
    .map( response => response.data);
  }

  sortUsers(kind) {
    return this.http
    .get(this.apiUrl + '?sort=' + kind, this.options)
    .map( response => response.json())
    .map( response => response.data);
  }

  deleteUser(id) {
    return this.http
    .delete(this.apiUrl + id, this.options)
    .subscribe();
  }

  changeUser(id, body) {
    return this.http
    .patch(this.apiUrl + id, body, this.options)
    .subscribe();
  }

  addUser(body) {
    this.http
    .post(this.apiUrl, body, this.options).subscribe();
  }

}
