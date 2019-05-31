import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

import { ViewlistPage } from '../viewlist/viewlist.page';
import { ProfilePopoverPage } from '../../popover/profile/profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // дефолтная информация о пользователе, что бы не кидало ошибок
  public info: any = {
    name: '',
    // white space
    picture: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    favorite: [],
    inprogress: [],
    readed: [],
    thrown: [],
    willread: []
  };

  constructor(
    private user: UserService,
    private storage: Storage,
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private toast: ToastController,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    // this.load();
    await this.FCMToken();

    await this.firebase.setScreenName('profile');
  }

  public async ionViewDidEnter() {
    await this.firebase.setScreenName('profile');
    await this.load();
  }

  public async popover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverPage,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  public async openList(name: string, list: any[]) {
    const modal = await this.modalController.create({
      component: ViewlistPage,
      backdropDismiss: true,
      showBackdrop: true,
      componentProps: {
        name,
        list
      }
    });

    await modal.present();
    await modal.onDidDismiss();
    await this.load();
  }

  public update(event: any) {
    this.load(true)
      .then(() => event.target.complete())
      .catch(() => event.target.cansel());
  }

  private async load(full: boolean = false) {
    try {
      const temp = await this.storage.get('user_local');
      if (temp && !full) {
        this.info = temp;
      } else {
        Object.assign(this.info, await this.user.getSelf());
        await this.storage.set(`user_local`, this.info);
      }
    } catch (e) {
      console.log(e);
      await this.storage.remove('token');
      this.router.navigateByUrl('/');
    }
  }

  private async FCMToken () {
    let token = await this.storage.get('user_local_fcm');
    if (!token) {
      token = await this.firebase.getToken();
      if (!token) {
        // its browser
        return;
      }
      await this.user.addFCM(token);
      await this.storage.set('user_local_fcm', token);
    }

    this.firebase.onTokenRefresh()
      .subscribe(async (t: string) => {
        await this.storage.set('user_local_fcm', t);
        await this.user.updateFCM(t, token);
      });
  }
}
