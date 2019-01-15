import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [IntroGuard] },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule'},
  { path: 'viewer', loadChildren: './pages/viewer/viewer.module#ViewerPageModule' },
  { path: 'search-results', loadChildren: './pages/search-results/search-results.module#SearchResultsPageModule' },
  { path: 'info/:id', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'reader/:id', loadChildren: './pages/reader/reader.module#ReaderPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
