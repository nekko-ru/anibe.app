import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { LoginGuard } from '../guards/login.guard';
import { Tab1Page } from '../pages/tab1/tab1.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { SearchResultsPage } from '../pages/search-results/search-results.page';
import { NotificationsPage } from '../pages/notifications/notifications.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../pages/tab1/tab1.module#Tab1PageModule',
            // component: Tab1Page
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../pages/profile/profile.module#ProfilePageModule'
            // component: ProfilePage
          }
        ],
        canActivate: [LoginGuard]
      },
      {
        path: 'search-results',
        children: [
          {
            path: '',
            loadChildren: '../pages/search-results/search-results.module#SearchResultsPageModule'
            // component: SearchResultsPage
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule'
            // component: NotificationsPage
          }
        ],
        canActivate: [LoginGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
