import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Router } from '@angular/router';
import { AppState } from './app.state';
import { IUser } from './services/interfaces';
import { Storage } from '@ionic/storage';

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
    private toastController: ToastController,
    public global: AppState,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  public current_user: IUser;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      this.storage.get('theme').then((theme) => this.global.set('theme', theme));

      this.storage.get('user_local').then((user) => this.current_user = user);

      this.firebase.onNotificationOpen()
        .subscribe(async data => {
          const counter: any = document.getElementById('notif-count');
          counter.innerHTML = Number(counter.innerHTML) + 1;

          const toast = await this.toastController.create({
            message: data.body,
            showCloseButton: true,
            duration: 5000,
            position: 'top',
            closeButtonText: 'Открыть'
          });
          toast.present();

          toast.onDidDismiss().then(async (value) => {
            console.log(value);

            if (value.role === 'cancel') {
              await this.router.navigateByUrl(data.url);
            }
          });
        });
    });
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
