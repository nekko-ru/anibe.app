import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReaderPage } from './reader.page';
import { SelectChapterPage } from '../select-chapter/select-chapter.page';

import {
  FivGalleryModule,
  FivLoadingSpinnerModule,
  FivCenterModule,
  FivFeatureDiscoveryModule,
  FivIconModule
} from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: ReaderPage
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
  declarations: [
    ReaderPage,
    SelectChapterPage
  ],
  entryComponents: [
    SelectChapterPage
  ]
})
export class ReaderPageModule {}
