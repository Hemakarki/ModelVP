import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommanService } from '../../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FlashMessagesService } from 'ngx-flash-messages';

declare let jsPDF; 

@Component({
  selector: 'app-users',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

    public data                  = [];
    public totalRecords          = 0;
    public filterQuery           = "";
    public rowsOnPage            = 5;
    public sortBy                = "";
    public sortOrder             = "desc";
    public activePage            = 1;
    public itemsTotal            = 0;
    public searchTerm            = '';
    public sortTrem              = '';
    
    public itemsOnPage;  
    
    public response:any;
    public isLoading:boolean     = false;
    public isPageLoading:boolean = true;

    public status;
    public user ;

    public constructor(
        private _router: Router, 
        private _userService: UserService, 
        private _cookieService: CookieService,
         private _commanService: CommanService, 
        private _flashMessagesService: FlashMessagesService ) { 
        }

    ngOnInit(): void {

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        /*set initial sort condition */
        this.sortTrem = 'createdAt' + ' ' + this.sortOrder; 

        /*Load data*/
        this.getUsers();        
        this.activePage = 1;
        this.getUsers();
        
        this.itemsOnPage = this.rowsOnPage;
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    changeStatus (userID,event) {
        this.status=event.target.checked;
        for (var i = this.data.length - 1; i >= 0; i--) {
            console.log("all data",this.data[i]);
        }
            if (this.status==true) {
                 this.data[i].status= this.status;
            }
            else {
                this.data[i].status= this.status;
            }   
            this.user= this.data[i];


            this._userService.update(this.user).subscribe ( res => {
                this.response = res;
        });
    }

    viewUser (userID) {
        let route = '/users/list/' + userID;
        this._router.navigate([route]);       
    }

    /*Function use to remove deleted crop from list*/ 
    removeByAttr(arr, attr, value){
        let i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 

               arr.splice(i,1);

           }
        }
        return arr;
    }

    /*This function is use to remove user session if Access token expired. */
    checkAccessToken( err ): void {
        let code    = err.code;
        let message = err.message;

        if( (code == 401 && message == "authorization")) {
            this._cookieService.removeAll();
            this._router.navigate(['/login', {data: true}]);
        }       
    }

    /*Get all Users */
    getUsers(): void {
        this._userService.getAllUsers( this.rowsOnPage, this.activePage, this.sortTrem,  this.searchTerm).subscribe(res => {
            this.isLoading     = false;
            this.isPageLoading = false;
            if(res.success) {
                this.data          = res.data.users;
                this.itemsTotal    = res.data.total;
                this.showAlert();
            } else {
                this.checkAccessToken(res.error);
            }
        },err => {
            this.isLoading     = false;
            this.isPageLoading = false;
       });             
    }    

    public onPageChange(event) {
        this.isLoading     = true;
        this.rowsOnPage = event.rowsOnPage;
        this.activePage = event.activePage;
        this.getUsers();
    }

    public onRowsChange( event ): void {
        this.isLoading  = true;
        this.rowsOnPage = this.itemsOnPage;
        this.activePage = 1;
        this.getUsers();      
    }

    public onSortOrder(event) {
        this.sortTrem = this.sortBy+' '+this.sortOrder;
        this.isLoading  = true; 
        this.getUsers();
    }

    public search( event, element = 'input' ) {
        if( element == 'input' ) {
            if(event.keyCode == 13 || this.searchTerm == '') {
                this.searchTerm = this.searchTerm.trim();
                this.isLoading  = true;
                this.getUsers();
                this.activePage = 1;
                this.getUsers(); 
            }
        }else{
            this.searchTerm = this.searchTerm.trim();
            this.isLoading  = true;
            this.getUsers();
            this.activePage = 1;
            this.getUsers(); 
        }
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
