import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ActionSheetController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePopoverPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  public async openSettings() {
    await this.popoverController.dismiss();
    await this.router.navigateByUrl('/settings');
  }

  public async openAbout() {
    await this.popoverController.dismiss();
    await this.router.navigateByUrl('/about');
  }

  public async logOut() {
    await this.popoverController.dismiss();
    const actionSheet = await this.actionSheetController.create({
      header: 'Вы точно хотите выйти из аккаунта?',
      buttons: [{
        text: 'Да',
        role: 'destructive',
        icon: 'log-out',
        handler: async () => {
          await this.storage.remove('token');
          await this.storage.remove('user_local');
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
