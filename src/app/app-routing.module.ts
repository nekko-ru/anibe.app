import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [IntroGuard] },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [LoginGuard] },
  { path: 'viewer', loadChildren: './viewer/viewer.module#ViewerPageModule' },
  { path: 'search-results', loadChildren: './search-results/search-results.module#SearchResultsPageModule' },
  { path: 'info/:id', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'reader/:id', loadChildren: './reader/reader.module#ReaderPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
