import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG2DataTableModule } from "angular2-datatable-pagination";
import { ListUserComponent } from './list-component/list-user.component';
import { ViewUserComponent } from './view-component/view-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { CustomFormsModule } from 'ng2-validation'
import { FlashMessagesModule } from 'ngx-flash-messages';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
      	UsersRoutingModule,
      	CommonModule,
        NG2DataTableModule,
        CustomFormsModule,
        FlashMessagesModule,
        SharedModule    
    ],
    declarations: [
      	ListUserComponent,
      	ViewUserComponent
    ]
})
export class UsersModule { }