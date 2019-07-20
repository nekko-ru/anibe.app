import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [IntroGuard]
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'search', loadChildren: './pages/search-results/search-results.module#SearchResultsPageModule' },
  { path: 'info/:id', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'reader/:id', loadChildren: './pages/reader/reader.module#ReaderPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [LoginGuard] },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'comments/:id', loadChildren: './pages/comments/comments.module#CommentsPageModule', canActivate: [LoginGuard] },
  { path: 'user/:id', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'news/:id', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'chats', loadChildren: './pages/chats/chats.module#ChatsPageModule', canActivate: [LoginGuard] },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule', canActivate: [LoginGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [LoginGuard] },
  { path: 'chat-id/:id', loadChildren: './pages/chat-id/chat-id.module#ChatIdPageModule', canActivate: [LoginGuard] },
  { path: 'reader2/:id/:chapter', loadChildren: './pages/reader2/reader2.module#Reader2PageModule' },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
