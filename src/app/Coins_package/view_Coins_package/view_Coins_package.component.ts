import { Component } from '@angular/core';
import { Coins_packageService } from '../Coins_package.service';
import { CommanService } from '../../shared/services/comman.service';
import { ActivatedRoute } from '@angular/router'
@Component({
	selector:'Coins_package-List',
	templateUrl: './view_Coins_package.component.html'
})

export class ViewCoins_packageComponent  {
		public isLoading : boolean =true;
		public Id ='';
		public results = {};
		public addEditDelete : boolean = false;
	constructor(private _Coins_packageService:Coins_packageService,private _commanService :CommanService, private _activatedRouter :ActivatedRoute ){
		let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['Coins_package']['addEditDelete'])
        	this.addEditDelete = true;

        this.Id =  _activatedRouter.snapshot.params['id'];
        if(this.Id) {
        	this._Coins_packageService.getRecordById(this.Id).subscribe( res => {
        		this.isLoading = false;
        		if(res.success){
        			this.results = res.data;
        		} else {
        			this._commanService.checkAccessToken(res.error);
        		}
        	}, err => {
        		this.isLoading = false;
                this._commanService.checkAccessToken(err);
        	})
        }
	}
}