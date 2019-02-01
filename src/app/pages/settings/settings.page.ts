import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public info: any;
  public showProfile: boolean;
  public toDay = new Date();

  public preload_img: boolean;

  constructor(
    private user: UserService,
    private storage: Storage,
    private toast: ToastController,
    private navController: NavController
  ) { }

  async ngOnInit() {
    this.load();

    this.preload_img = (await this.storage.get('image_preload'));
  }

  private async load() {
    this.info = await this.storage.get('user_local');
    this.showProfile = this.info ? true : false;

    console.log(this);
  }

  public async saveChanges() {
    await this.storage.set('image_preload', this.preload_img);
    try {
      this.info = await this.user.update({
        picture: this.info.picture,
        name: this.info.name,
        desc: this.info.desc
      });
      await this.storage.set('user_local', this.info);

      // go to profile
      this.navController.goBack();
    } catch (e) {
      console.warn(e);
      (await this.toast.create({
        message: e.error,
        duration: 5000
      })).present();
    }
  }
}
