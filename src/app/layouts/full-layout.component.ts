import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommanService } from '../shared/services/comman.service';
import { CookieService } from 'ngx-cookie';
@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html',
    providers: [CommanService]
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean           = false;
  public status: {isopen: boolean}   = {isopen: false};
  public active;
  public changePasswordModal: boolean= false;
  public access = {
        users:false,
        Subscription:false,
        change_password:false

    }

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private _cookieService: CookieService,
        private _commanService: CommanService) {

        this.active = this._route.snapshot["_urlSegment"].segments[0].path;
        let actions = this._commanService.getActions();
        if (actions["type"] == 'SA') {
            this.access = {

                users:true,
                Subscription:true,
                change_password: true

            }
        } else {
            this.access = {
                users:actions['users'].view,
                Subscription:actions['Subscription'].view,
                change_password: actions['change-password'].view

            }
        }
    }

    public toggled(open: boolean): void { }
    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void { }

    layout(key) {
        if (key == 'users' && this.access.users) {
            this.applyRouter(key);
        } else if(key == 'Subscription' && this.access.Subscription) {
            this.applyRouter(key);
        }else if(key == 'change-password' && this.access.change_password) {
            this.applyRouter(key);
        } else {
        }
    }

    applyRouter(key) {
        this.active = key;
        let route = '/' + key + '/list';
        this.router.navigate([route]);
    }

    logout() {
        localStorage.clear();
        this._cookieService.removeAll();
        this.router.navigate(['/login']);
    }
    
    // changePassword(value: any) {

    // }
    // showModal() {
    //     this.changePasswordModal = true;
    // }
}
