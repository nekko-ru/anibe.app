import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfigProvider } from './providers/config.provider';

import 'hammerjs';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private remote_config: ConfigProvider,
    private firebase: Firebase,
    private router: Router,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.remote_config.initialize();

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
}
