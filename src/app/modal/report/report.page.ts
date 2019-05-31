import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, ModalController } from '@ionic/angular';
import { ReportService } from 'src/app/services/report.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  // привязка к посту, пользователю
  @Input() public post_id?: string;
  @Input() public user_id?: string;

  public name: string;
  public body: string;

  public reportForm: Form;

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private toast: ToastController,
    private rep: ReportService,
    private firebase: Firebase
  ) { }

  ngOnInit() {
  }

  public async close() {
    await this.modalController.dismiss({ action: 'closed' });
  }

  public async report() {
    const user_local = await this.storage.get('user_local');
    try {
      await this.rep.send({
        name: this.name,
        body: this.body,
        post_id: this.post_id,
        user_id: this.user_id,
        authod_id: user_local.id || ''
      });

      (await this.toast.create({
        message: 'Спасибо за репорт!',
        duration: 5000
      })).present();
      this.modalController.dismiss({ action: 'sended' });
    } catch (e) {
      // логируем в консоль браузера
      console.error(e);
      // логируем в фаербейс
      await this.firebase.logError(e);
      (await this.toast.create({
        message: 'Ошибка при отправке, попробуйте чуть позже',
        duration: 5000
      })).present();
    }
  }
}
