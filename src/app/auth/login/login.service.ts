import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import tsConstants = require('./../../tsconstant');

@Injectable()
export class LoginService {
    private _host = tsConstants.HOST;
  	
  	constructor(private _http: Http) { }

	login(user) {
        let headers           = new Headers();
        let username:string   = user.username;
        let password:string   = user.password;
        let urlSearchParams   = new URLSearchParams();
        
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString()
        return this._http.post(this._host +'/login', body, { headers: headers }).map((res:Response) => res.json())
    }
}
