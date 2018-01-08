import { Component, OnInit } from '@angular/core';
import { Coins_packageService } from '../Coins_package.service';
import { CommanService } from '../../shared/services/comman.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
	selector:'Coins_package_package-AddUpdate',
	templateUrl:'./addupdate_Coins_package.component.html'
})

export class AddUpdateCoins_packageComponent implements OnInit {
	public results ={
	title:'',
	description:'',
	category:''
	};
	public Coins_packageId = '';
    public isLoading       = false;
    public isPageLoading   = true;
    public oBj = {vname: ''};
    public type;
    public errMessage = '';

    constructor(private _router : Router,private _activateRouter: ActivatedRoute, private _Coins_packageService:Coins_packageService ,private _commanService:CommanService, private _flashMessagesService: FlashMessagesService,private _cookieService: CookieService){
    	this.Coins_packageId = _activateRouter.snapshot.params['id'];
        	if(this.Coins_packageId){
    		this._Coins_packageService.getRecordById(this.Coins_packageId).subscribe( res => {
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
      	if(this.Coins_packageId){
      		this._Coins_packageService.editRecord(this.results).subscribe( res => {
                this.isLoading         = false;
                this._cookieService.put('Coins_packageAlert', 'Updated successfully.');
                this._router.navigate(['/Coins_package_package/list']);
      		}, err => {
      			this.isLoading = false;
      		})
      	} else {
      		this._Coins_packageService.addRecord(this.results).subscribe(res => {
                  console.log("Coins_package_package added");
                  console.log(res);
                this.isLoading         = false;
                this._cookieService.put('Coins_packageAlert', 'Added successfully.');
                this._router.navigate(['/Coins_package_package/list']);
            },err => {
                   var errBody = JSON.parse(err._body);
                    if(errBody.invalidAttributes.name){
                      let dangerErrors = "Coins_package_package name already exists.";
                      this._cookieService.put('Coins_packageExistAlert', dangerErrors);
                    }
                this.showDangerAlert();
                this.isLoading = false;
            });
      	}
      }

    showDangerAlert(): void {
        let alertMessage = this._cookieService.get('Coins_packageExistAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
            this._cookieService.remove('Coins_packageExistAlert');
        }    
    }
}