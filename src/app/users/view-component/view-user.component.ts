import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../services/user.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
@Component({
    templateUrl: 'view-user.component.html'
})
export class ViewUserComponent {
	public userID        = '';
	public user          = {};
    public isLoading     = true;
    public addEditDelete = false

    constructor(
        private _route: ActivatedRoute, 
        private _router : Router,
        private _userService: UserService, 
        private _cookieService: CookieService,
        private _commanService: CommanService  ) { 
        this.userID = _route.snapshot.params['id'];
  	    this._userService.get(this.userID).subscribe(res => {
            if(res.success) {
               this.user = res.data;
               this.isLoading = false;
            } else {
               this.checkAccessToken(res.error); 
            } 
        },err => {
           this.isLoading = false
        });
    }
    /*This function is use to remove user session if Access token expired. */
    checkAccessToken( err ): void {
        let code    = err.code;
        let message = err.message;

        if( (code == 401 && message == "authorization")) {
            this._cookieService.removeAll();
            this._router.navigate(['/login', {data: true}]);
        }        
    }
}
