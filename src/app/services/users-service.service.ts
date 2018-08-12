import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor( private http: Http ) { }

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

    

}
