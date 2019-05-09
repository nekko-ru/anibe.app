import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
  public enablefcm: boolean;

  constructor(
    private user: UserService,
    private storage: Storage,
    private toast: ToastController,
    private navController: NavController,
    private imagePicker: ImagePicker
  ) { }

  async ngOnInit() {
    this.load();

    this.preload_img = (await this.storage.get('image_preload'));
    this.enablefcm = (await this.storage.get('enablefcm')) || true;
  }

  public async pickImage() {
    if (!await this.imagePicker.hasReadPermission()) {
      await this.imagePicker.requestReadPermission();

      (await this.toast.create({
        message: 'Попробуйте снова',
        duration: 2000
      })).present();
      return;
    }
    const result = await this.imagePicker.getPictures({
      maximumImagesCount: 1
    });

    this.info = await this.user.updateAvatar(result[0]);

    await this.storage.set('user_local', this.info);

    (await this.toast.create({
      message: 'Ваша аватарка успешно загружена и скоро обновиться',
      duration: 5000
    })).present();
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
