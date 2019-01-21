import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  /**
   * @description код который необходимо сканировать
   */
  private access_key = 'nz4jzj8rwtp5cu7g';

  constructor(
    private storage: Storage,
    private router: Router,
    private qrScanner: QRScanner,
    private toastController: ToastController,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    await this.firebase.setScreenName('intro');
  }

  async scan() {
    await this.firebase.logEvent('tutorial_begin', {});

    const ionApp = <HTMLElement>document.getElementsByTagName('ion-app')[0];
    const s = await this.qrScanner.prepare();
    if (s.authorized) {
      // у нас есть права на камеру
      const scan = this.qrScanner.scan();
      this.qrScanner.show();
      ionApp.style.display = 'none';

      const scanSub = scan.subscribe(async (qr: any) => {
        console.log('Scanned: ', qr);

        const toast = await this.toastController.create({
          message: `Код ${qr.result || qr} успешно активирован на данном устройстве!`,
          duration: 5000
        });

        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
        ionApp.style.display = 'block';

        // todo: добавить регистрацию кодов!
        if (qr.result === this.access_key || qr === this.access_key) {
          toast.present();

          await this.storage.set('tutorialComplete', true);
          await this.firebase.logEvent('tutorial_complete', {});
          this.router.navigateByUrl('/');
        }
      });

    } else if (s.denied) {
      // camera permission was permanently denied
      this.qrScanner.openSettings();
    } else {
      this.qrScanner.openSettings();
      // permission was denied, but not permanently. You can ask for permission again at a later time.
    }
  }
}
