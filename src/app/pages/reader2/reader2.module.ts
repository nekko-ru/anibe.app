import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Reader2Page } from './reader2.page';
import { FivGalleryModule, FivLoadingSpinnerModule, FivCenterModule, FivFeatureDiscoveryModule, FivIconModule } from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: Reader2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

    FivGalleryModule,
    FivLoadingSpinnerModule,
    FivCenterModule,
    FivFeatureDiscoveryModule,
    FivIconModule,
  ],
  declarations: [Reader2Page]
})
export class Reader2PageModule {}
