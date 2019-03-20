import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../pages/tab1/tab1.page';
import { SearchResultsPage } from '../pages/search-results/search-results.page';
import { NotificationsPage } from '../pages/notifications/notifications.page';
import { ProfilePage } from '../pages/profile/profile.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    Tab1Page,
    SearchResultsPage,
    NotificationsPage,
    ProfilePage
  ]
})
export class TabsPageModule {}
