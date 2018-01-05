import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import tsConstants = require('./../tsconstant');

@Injectable()
export class ChangePasswordService {

 	private _host = tsConstants.HOST;
  	
  	constructor(private _http: Http) { }

	changePassword(data) {

        let headers           = new Headers();		
        return this._http.post(this._host +'/changepassword', data, { headers: headers }).map((res:Response) => res.json())
    }

}
