import { Component } from '@angular/core';
import { SubscriptionService } from '../Subscription.service';
import { CommanService } from '../../shared/services/comman.service';
import { ActivatedRoute } from '@angular/router'
@Component({
	selector:'Subscription-List',
	templateUrl: './view_Subscription.component.html'
})

export class ViewSubscriptionComponent  {
		public isLoading : boolean =true;
		public Id ='';
		public results = {};
		public addEditDelete : boolean = false;
	constructor(private _SubscriptionService:SubscriptionService,private _commanService :CommanService, private _activatedRouter :ActivatedRoute ){
		let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['Subscription']['addEditDelete'])
        	this.addEditDelete = true;

        this.Id =  _activatedRouter.snapshot.params['id'];
        if(this.Id) {
        	this._SubscriptionService.getRecordById(this.Id).subscribe( res => {
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