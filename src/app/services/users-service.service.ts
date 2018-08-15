import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor( private http: Http, private router: Router ) { }
  headers = {
    "Accept": "application/vnd.api+json",
    "Accept-Encoding": "utf-8",
    "Accept-Language": "uk",
    "Content-Type": "application/vnd.api+json",
    "Content-Language": "uk"
  }

    getUsers(apiUrl){
      let headers = new Headers();
      headers.append("Accept", "application/vnd.api+json");
      headers.append("Accept-Language", "uk");
      headers.append("Content-Type", "application/vnd.api+json");
      headers.append("Content-Language", "uk");
      let options = new RequestOptions({ headers: headers });
      return this.http
      .get(apiUrl, options)
      .map( response => response.json())
      .map( response => response.data)
    };

    user_delete(userId) {
      fetch("http://angulartest.vivasg.com/human/" + userId, {
        method: 'delete',
        mode: 'cors',
        headers: this.headers
      });
      this.router.navigate(['/contacts']);
    }  


  
}
