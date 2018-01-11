import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddUpdateCoins_packageComponent } from './addupdate_Coins_package/addupdate_Coins_package.component';
import { ListCoins_packageComponent } from './list_Coins_package/list_Coins_package.component';
import { ViewCoins_packageComponent } from './view_Coins_package/view_Coins_package.component';
import { Coins_packageRouting } from './Coins_package.routing';
import { Coins_packageService } from './Coins_package.service';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { NG2DataTableModule } from "angular2-datatable-pagination";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		Coins_packageRouting,
		FlashMessagesModule,
		FormsModule,
		CustomFormsModule,
		NG2DataTableModule,
		
	],
	exports: [
    RouterModule,
    FormsModule
  ],
	declarations : [ ListCoins_packageComponent,AddUpdateCoins_packageComponent,ViewCoins_packageComponent],
	providers :[Coins_packageService]
})
export class Coins_packageModule { }