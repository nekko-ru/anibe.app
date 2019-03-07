import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [IntroGuard] },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'search-results', loadChildren: './pages/search-results/search-results.module#SearchResultsPageModule' },
  { path: 'info/:id', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'reader/:id', loadChildren: './pages/reader/reader.module#ReaderPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'comments/:id', loadChildren: './pages/comments/comments.module#CommentsPageModule', canActivate: [LoginGuard] },
  { path: 'user/:id', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'news/:id', loadChildren: './pages/news/news.module#NewsPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
