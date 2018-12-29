import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'viewer', loadChildren: './viewer/viewer.module#ViewerPageModule' },
  { path: 'search-results', loadChildren: './search-results/search-results.module#SearchResultsPageModule' },
  { path: 'search-params', loadChildren: './search-params/search-params.module#SearchParamsPageModule' },
  { path: 'info/:id', loadChildren: './info/info.module#InfoPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
