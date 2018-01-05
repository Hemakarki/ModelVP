import { Routes, RouterModule } from '@angular/router';
import { AddUpdateSubscriptionComponent } from './addupdate_Subscription/addupdate_Subscription.component';
import { ListSubscriptionComponent } from './list_Subscription/list_Subscription.component';
import { ViewSubscriptionComponent } from './view_Subscription/view_Subscription.component';
import { ChildRouteGuard } from '../auth/services/child-route-guard';

export const SubscriptionRoutes : Routes =[
  {
    path: '',
    data: {
      title: 'Subscription'
    },
    children: [
      {
        path: '',
        component: ListSubscriptionComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'list',
        component: ListSubscriptionComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        component: AddUpdateSubscriptionComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Add Subscription '
        }
      },
      {
        path: 'list/:id',
        component: ViewSubscriptionComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'View'
        }
      },
      {
        path: 'edit/:id',
        component: AddUpdateSubscriptionComponent,
        canActivate: [ChildRouteGuard],
        data: {
          title: 'Edit Subscription '
        }
      }
    ]
  }
]; 

export const SubscriptionRouting = RouterModule.forChild(SubscriptionRoutes) ;