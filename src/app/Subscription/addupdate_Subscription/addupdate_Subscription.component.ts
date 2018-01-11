import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../Subscription.service';
import { CommanService } from '../../shared/services/comman.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
	selector:'Subscription-AddUpdate',
	templateUrl:'./addupdate_Subscription.component.html'
})

export class AddUpdateSubscriptionComponent implements OnInit {
	public results ={
	title:'',
	description:'',
	category:''
	};
	public SubscriptionId = '';
    public isLoading       = false;
    public isPageLoading   = true;
    public oBj = {vname: ''};
    public type;
    public errMessage = '';

    constructor(private _router : Router,
        private _activateRouter: ActivatedRoute, 
        private _SubscriptionService:SubscriptionService ,
        private _commanService:CommanService,
        private _flashMessagesService: FlashMessagesService,
        private _cookieService: CookieService
    ){
        this.SubscriptionId = _activateRouter.snapshot.params['id'];
        	if(this.SubscriptionId){
    		this._SubscriptionService.getRecordById(this.SubscriptionId).subscribe( res => {
    			this.isPageLoading = false;
                if(res.success) {
                    this.results = res.data;
                   } else {
                    this._commanService.checkAccessToken(res.error);
                }
    		}, err => {
    			this.isPageLoading = false;
    			this._commanService.checkAccessToken(err);
    		})
    	} else {
    		this.isPageLoading = false;
    	}
    }

    ngOnInit(): void {
        this.showDangerAlert();
    }

    save(){
    	this.isLoading = true;
    	if(this.SubscriptionId){
    		this._SubscriptionService.editRecord(this.results).subscribe( res => {
              this.isLoading         = false;
              this._cookieService.put('SubscriptionAlert', 'Updated successfully.');
              this._router.navigate(['/Subscription/list']);
    		}, err => {
    			this.isLoading = false;
    		})
    	} else {
    		this._SubscriptionService.addRecord(this.results).subscribe(res => {
              this.isLoading         = false;
              this._cookieService.put('SubscriptionAlert', 'Added successfully.');
              this._router.navigate(['/Subscription/list']);
          },err => {
                let dangerErrors = "Subscription title already exists.";
                this._cookieService.put('SubscriptionExistAlert', dangerErrors);
              this.showDangerAlert();
              this.isLoading = false;
          });
    	}
    }

    showDangerAlert(): void {
        let alertMessage = this._cookieService.get('SubscriptionExistAlert');
        console.log(alertMessage,"alertMessage")
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
            this._cookieService.remove('SubscriptionExistAlert');
        }    
    }
}