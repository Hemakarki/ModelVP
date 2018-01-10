import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SubscriptionService } from '../Subscription.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages';

declare let jsPDF; 

@Component({
	selector:'Subscription-view',
	templateUrl:'./list_Subscription.component.html'
})

export class ListSubscriptionComponent implements OnInit{
	public isLoading:boolean = false;
	public isPageLoading:boolean = true;
	public searchTerm = '';
	public activePage = 1;
	public addEditDelete = false;
	public data = [];
	public rowsOnPage =5;
	public itemsOnPage;
	public sortOrder = "desc";
	public sortTrem ='';
    public sortBy                = "";
    public itemsTotal            = 0;
    public response:any;
    public roles                 = 'A';

	constructor( private _router: Router, 
        private _SubscriptionService: SubscriptionService, 
        private _cookieService: CookieService,
        private _commanService: CommanService, 
        private _flashMessagesService: FlashMessagesService) {
        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['Subscription']['addEditDelete'])
         this.addEditDelete = true;
	}

	ngOnInit(): void {

      this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

         /* set initial sort condition */
        this.sortTrem = 'created_at' + ' ' + this.sortOrder; 

        /*Load data*/
        this.getSubscription();
        
        this.itemsOnPage = this.rowsOnPage;
    } 

    removeSubscription(id){
    	if(confirm("Do you want to delete?")) {
            this.isLoading = true;
            this._SubscriptionService.deleteRecord(id).subscribe(res => {
                this.isLoading = false;    
                let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
                this.itemsTotal = this.itemsTotal - 1;
                
                if( ! (this.itemsTotal >= start) ){
                   this.activePage = this.activePage -1
                }
                this._cookieService.put('SubscriptionAlert', 'Deleted successfully.');
                /* reload page. */
                this.getSubscription();
            },err => {
                this.isLoading = false;
            });             
        }
    } 

	public search( event, element = 'input' ) {
        if( element == 'input' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.activePage = 1;
                this.getSubscription(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.activePage = 1;
            this.getSubscription(); 
        }
    }
    getSubscription(): void {
        this._SubscriptionService.getAllRecords( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.subscriptions;
                this.itemsTotal    = res.data.total;
                this.showAlert();
            } else {
                this._commanService.checkAccessToken(res.error);
            }
        },err => {
            this.isLoading     = false;
            this.isPageLoading = false;
            this._commanService.checkAccessToken(err);
       });             
    } 

     public onPageChange(event) {
        this.isLoading     = true;
        this.rowsOnPage = event.rowsOnPage;
        this.activePage = event.activePage;
        this.getSubscription();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getSubscription();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getSubscription();
    }

    showAlert(): void {

        let alertMessage = this._cookieService.get('userAlert');
        if( alertMessage ) {
            this._flashMessagesService.show( alertMessage, {
                classes: ['alert', 'alert-success'],
                timeout: 3000,
            });
            this._cookieService.remove('userAlert');
        }    
    }
}