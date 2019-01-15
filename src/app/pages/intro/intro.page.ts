import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

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
    private qrScanner: QRScanner
  ) { }

  ngOnInit() {
  }

  async scan() {
    const s = await this.qrScanner.prepare();
    if (s.authorized) {
      // у нас есть права на камеру
      const scanSub = this.qrScanner.scan().subscribe(async (qr: any) => {
        console.log('Scanned: ', qr);

        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning

        // todo: добавить регистрацию кодов!
        if (qr.result === this.access_key) {
          await this.storage.set('tutorialComplete', true);
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
