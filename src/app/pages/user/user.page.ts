import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/providers/user.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public info: any;

  private id: string;
  private spiner: HTMLIonLoadingElement;

  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private storage: Storage,
    private loadingController: LoadingController,
    private firebase: Firebase,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();
    await this.load();

    await this.spiner.dismiss();

    await this.firebase.setScreenName('user');
  }

  private async load(full: boolean = false) {
    try {
      const temp = await this.storage.get(`user_${this.id}`);
      if (temp && !full) {
        this.info = temp;
      } else {
        this.info = await this.user.get(this.id);
        await this.storage.set(`user_${this.id}`, this.info);
      }
    } catch (e) {
      // логируем в консоль браузера
      console.error(e);
      // логируем в фаербейс
      await this.firebase.logError(e);
      (await this.toast.create({
        message: 'Ошибка при загрузке, попробуйте чуть позже',
        duration: 5000
      })).present();
    }
  }
}
