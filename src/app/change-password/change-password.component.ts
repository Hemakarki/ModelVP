import { Component, OnInit, ReflectiveInjector  } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'change-forgot-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
    providers: [ChangePasswordService]
})
export class ChangePasswordComponent implements OnInit {

	public data	      = '';
	public errMessage 	  = '';
    public successMessage = '';
	public isPageLoading  = false;

	constructor(private _router : Router, private _ChangePasswordService: ChangePasswordService, private _cookieService: CookieService) { }

	ngOnInit() {
	}

	submit() {
		this.isPageLoading     = true;
        this.errMessage        = '';        

		this._ChangePasswordService.changePassword(this.data).subscribe(res => {
            this.isPageLoading = false;
            if(res.success) {
                this.successMessage = res.data.message;    
            } else {
                this.errMessage     = res.error.message;
            }
        },err => {       
            this.isPageLoading = false;
            this.errMessage    = "password is incorrect";    
        });
	}
}
