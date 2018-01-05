import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddUpdateSubscriptionComponent } from './addupdate_Subscription/addupdate_Subscription.component';
import { ListSubscriptionComponent } from './list_Subscription/list_Subscription.component';
import { ViewSubscriptionComponent } from './view_Subscription/view_Subscription.component';
import { SubscriptionRouting } from './Subscription.routing';
import { SubscriptionService } from './Subscription.service';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { NG2DataTableModule } from "angular2-datatable-pagination";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SubscriptionRouting,
		FlashMessagesModule,
		FormsModule,
		CustomFormsModule,
		NG2DataTableModule
	],
	exports: [
    RouterModule,
    FormsModule
  ],
	declarations : [ ListSubscriptionComponent,AddUpdateSubscriptionComponent,ViewSubscriptionComponent],
	providers :[SubscriptionService]
})
export class SubscriptionModule { }