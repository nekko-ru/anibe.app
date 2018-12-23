import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchParamsPage } from './search-params.page';

const routes: Routes = [
  {
    path: '',
    component: SearchParamsPage
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
    SearchParamsPage
  ],
  entryComponents: []
})
export class SearchParamsPageModule {}
