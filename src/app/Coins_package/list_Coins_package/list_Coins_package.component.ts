import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coins_packageService } from '../Coins_package.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FlashMessagesService } from 'ngx-flash-messages';

declare let jsPDF; 

@Component({
	selector:'Coins_package-view',
	templateUrl:'./list_Coins_package.component.html'
})

export class ListCoins_packageComponent implements OnInit{
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
        private _Coins_packageService: Coins_packageService, 
        private _cookieService: CookieService,
        private _commanService: CommanService, 
        private _flashMessagesService: FlashMessagesService) {
        let actions = this._commanService.getActions();
        if(actions["type"] == 'SA' || actions['Coins_package']['addEditDelete'])
         this.addEditDelete = true;
	}

	ngOnInit(): void {

       /* this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        set initial sort condition */
        this.sortTrem = 'createdAt' + ' ' + this.sortOrder; 

        /*Load data*/
        this.getCoins_package();
        
        this.itemsOnPage = this.rowsOnPage;
    } 

    removeCoins_package(id){
    	if(confirm("Do you want to delete?")) {
            this.isLoading = true;
            this._Coins_packageService.deleteRecord(id).subscribe(res => {
                this.isLoading = false;    
                let start       = (this.activePage * this.rowsOnPage - this.rowsOnPage + 1);
                this.itemsTotal = this.itemsTotal - 1;
                
                if( ! (this.itemsTotal >= start) ){
                   this.activePage = this.activePage -1
                }
                this._cookieService.put('Coins_packageAlert', 'Deleted successfully.');
                /* reload page. */
                this.getCoins_package();
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
                this.getCoins_package(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.activePage = 1;
            this.getCoins_package(); 
        }
    }
    getCoins_package(): void {
        this._Coins_packageService.getAllRecords( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm ).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.Coins_package;
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
        this.getCoins_package();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getCoins_package();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getCoins_package();
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
    
    downloadCSV(): void {
        let i;
        let filteredData = [];
        
        let header = {
            amount:"Amount",
            Package_Validity:'Package_Validity'
        }

        filteredData.push(header);

        for ( i = 0; i < this.data.length ; i++ ) { 
            let date = new Date(this.data[i].createdAt);
            let temp = {
                amount: this.data[i].amount,
                Package_Validity: this.data[i].Package_Validity ? this.data[i].Package_Validity : '-'
            };

            filteredData.push(temp);
        }       

        let fileName = "AdminUsersReport-"+Math.floor(Date.now() / 1000); 
        new Angular2Csv( filteredData, fileName);
    }

    downloadPDF() {
        
        let i;
        let filteredData = [];

        let header = [
            "Amount",
            "Package_Validity"
        ]  

        for ( i = 0; i < this.data.length ; i++ ) { 
            let date = new Date(this.data[i].createdAt);
            let registeredOn = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            let temp = [
                this.data[i].Amount,  
                this.data[i].description,                
                this.data[i].Package_Validity
            ];

            filteredData.push(temp);
        }       

        let fileName = "AdminUsersReport-"+Math.floor(Date.now() / 1000); 

        var doc = new jsPDF();    

        doc.autoTable(header, filteredData,  {
            theme: 'grid',
            headerStyles: {fillColor: 0},
            startY: 10, // false (indicates margin top value) or a number 
            margin: {horizontal: 6}, // a number, array or object 
            pageBreak: 'auto', // 'auto', 'avoid' or 'always' 
            tableWidth: 'wrap', // 'auto', 'wrap' or a number,  
            tableHeight: '1', // 'auto', 'wrap' or a number,  
            showHeader: 'everyPage',
            tableLineColor: 200, // number, array (see color section below) 
            tableLineWidth: 0,
            fontSize: 10,
            overflow : 'linebreak',
            columnWidth : 'auto',
            cellPadding : 2,       
            cellSpacing : 0,       
            valign : 'top',
            lineHeight: 15, 

        });

        doc.save(fileName);
    }
	
}