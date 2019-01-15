import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchResultsPage } from './search-results.page';
import { SearchParamsPage } from '../search-params/search-params.page';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsPage
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
    SearchResultsPage,
    SearchParamsPage
  ],
  entryComponents: [
    SearchParamsPage
  ]
})
export class SearchResultsPageModule {}
