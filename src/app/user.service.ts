import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService{

    constructor( private http: Http ){}
    
    getUsers(apiUrl){
        let headers = new Headers();
        headers.append("Accept", "application/vnd.api+json");
        headers.append("Accept-Encoding", "utf-8");
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