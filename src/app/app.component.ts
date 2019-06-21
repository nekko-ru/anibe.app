import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Router } from '@angular/router';
import { AppState } from './app.state';
import { IUser } from './services/interfaces';
import { FivDialog } from '@fivethree/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // public appPages = [
  //   {
  //     title: 'Главная',
  //     url: '/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Поиск',
  //     url: '/search',
  //     icon: 'search'
  //   },
  //   {
  //     title: 'Чаты',
  //     url: '/chats',
  //     icon: 'chatbubbles'
  //   },
  //   {
  //     title: 'Уведомления',
  //     url: '/notifications',
  //     icon: 'notifications'
  //   },
  //   {
  //     title: 'Профиль',
  //     url: '/profile',
  //     icon: 'person'
  //   }
  // ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebase: Firebase,
    private router: Router,
    public global: AppState,
  ) {
    this.initializeApp();
  }

  public current_user: IUser;

  @ViewChild('dialog') dialog: FivDialog;

  public alert: any = {
    backdrop: true,
    pull: true,
    verticalAlign: 'top',
    horizontalAlign: 'left',
    shape: 'fill',
    duration: 3600,
    inDuration: '220',
    outDuration: '180',

    url: '',
    title: 'Новое уведомление',
    content: 'На ваш комментарий кто то недавно ответили'
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      this.firebase.onNotificationOpen()
        .subscribe(async data => {

          this.alert.url = data.url;
          this.alert.title = data.title;
          this.alert.content = data.body;
          this.dialog.open();
        });
    });
  }

  public async open(url: string) {
    await this.router.navigateByUrl(url);
  }

  public async ionChange(e: any) {
    console.log(e);
    if (e.detail.checked) {
      await this.global.setAsync('theme', 'theme-dark');
    } else {
      await this.global.setAsync('theme', '');
    }
  }
}
