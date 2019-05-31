import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public info: any;
  public showProfile: boolean;
  public toDay = new Date();

  public preload_img = true;
  public enablefcm: boolean;

  constructor(
    private user: UserService,
    private storage: Storage,
    private toast: ToastController,
    private navController: NavController,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    this.load();

    this.preload_img = (await this.storage.get('image_preload')) || true;
    this.enablefcm = (await this.storage.get('enablefcm')) || true;

    await this.firebase.setScreenName('settings');
  }

  private async load() {
    this.info = await this.storage.get('user_local');
    this.showProfile = this.info ? true : false;

    console.log(this);
  }

  public async saveChanges() {
    await this.storage.set('image_preload', this.preload_img);
    await this.storage.set('enablefcm', this.enablefcm);
    try {
      this.info = await this.user.update({
        picture: this.info.picture,
        name: this.info.name,
        desc: this.info.desc,
        enablefcm: this.enablefcm
      });
      await this.storage.set('user_local', this.info);

      // go to profile
      this.navController.back();
    } catch (e) {
      console.warn(e);
      (await this.toast.create({
        message: e.error,
        duration: 5000
      })).present();
    }
  }
}
