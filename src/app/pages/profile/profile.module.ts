import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ViewlistPage } from '../viewlist/viewlist.page';
import { ProfilePopoverPage } from '../../popover/profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfilePage,
    ViewlistPage,
    ProfilePopoverPage
  ],
  entryComponents: [ViewlistPage, ProfilePopoverPage]
})
export class ProfilePageModule {}
