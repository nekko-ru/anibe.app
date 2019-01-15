import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReaderPage } from './reader.page';
import { SelectChapterPage } from '../select-chapter/select-chapter.page';

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
    RouterModule.forChild(routes)
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
