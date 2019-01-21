import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/user.service';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // дефолтная информация о пользователе, что бы не кидало ошибок
  private info: any = {
    name: '',
    picture: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    favorite: [],
    inprogress: [],
    readed: [],
    thrown: []
  };

  constructor(
    private user: UserService,
    private storage: Storage,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    try {
      Object.assign(this.info, await this.user.getSelf());
    } catch (e) {
      console.log(e);
      await this.storage.remove('token');
      this.router.navigateByUrl('/');
    }

    await this.firebase.setScreenName('profile');
  }

  async logOut() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Вы точно хотите выйти из аккаунта?',
      buttons: [{
        text: 'Да',
        role: 'destructive',
        icon: 'log-out',
        handler: async () => {
          await this.storage.remove('token');
          this.router.navigateByUrl('/');
        }
      }, {
        text: 'Отмена',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
