import { Routes, RouterModule } from '@angular/router';
import { AddUpdateCoins_packageComponent } from './addupdate_Coins_package/addupdate_Coins_package.component';
import { ListCoins_packageComponent } from './list_Coins_package/list_Coins_package.component';
import { ViewCoins_packageComponent } from './view_Coins_package/view_Coins_package.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';

export const Coins_packageRoutes : Routes =[
  {
    path: '',
    data: {
      title: 'Coins_package'
    },
    children: [
      {
        path: '',
        component: ListCoins_packageComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListCoins_packageComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        component: AddUpdateCoins_packageComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add Coins_package '
        }
      },
      {
        path: 'list/:id',
        component: ViewCoins_packageComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'View'
        }
      },
      {
        path: 'edit/:id',
        component: AddUpdateCoins_packageComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit Coins_package '
        }
      }
    ]
  }
]; 

export const Coins_packageRouting = RouterModule.forChild(Coins_packageRoutes) ;