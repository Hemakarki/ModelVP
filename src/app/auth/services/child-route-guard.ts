import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';


@Injectable()
export class ChildRouteGuard implements CanActivate {

    constructor(
        private _router : Router, 
        private _cookieService: CookieService ) { }

    canActivate(
        _route : ActivatedRouteSnapshot,
        _state : RouterStateSnapshot) {

        var url = _state.url
        let actions = this._cookieService.getObject('actions');

        if(actions['type'] == 'SA') {
            return true;
        } else {
            this.authorizationEror();
            return false;
        }

    }

    authorizationEror() {
        alert("You are not allow to access this page");
    }
}