import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email: string;
  public username: string;
  public psw1: string;
  public psw2: string;

  constructor(
    private user: UserService,
    private toast: ToastController,
    private firebase: Firebase,
    private router: Router,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.firebase.setScreenName('register');
  }

  public async reg() {
    if (this.psw1 !== '' && this.psw1 !== this.psw2) {
      (await this.toast.create({
        message: 'Пароли должны быть одинаковыми!',
        duration: 5000
      })).present();
      return;
    }

    if (this.psw1.length < 6) {
      (await this.toast.create({
        message: 'Пароль должны быть больше 6 символов!',
        duration: 5000
      })).present();
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      (await this.toast.create({
        message: 'Не верный email!',
        duration: 5000
      })).present();
      return;
    }

    try {
      const user = await this.user.reg({
        email: this.email,
        name: this.username,
        password: this.psw1,
        picture: null
      });

      await this.storage.set('token', user.token);
      await this.firebase.logEvent('sign_up', { sign_up_method: 'email' });
      await this.firebase.setUserId(user.user.id);
      await this.router.navigateByUrl('/tabs/profile');
    } catch (err) {
      if (err.status === 409) {
        (await this.toast.create({
          message: 'Данная почта уже используется!',
          duration: 5000
        })).present();
        return;
      }
      if (err.status === 400) {
        (await this.toast.create({
          message: 'Ошибка при заполнении!',
          duration: 5000
        })).present();
        return;
      }

      (await this.toast.create({
        message: 'Внутреняя ошибка, попробуйте чуть позже!',
        duration: 5000
      })).present();
    }
  }
}
