import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/providers/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private username: string;
  private password: string;

  constructor(
    private storage: Storage,
    private router: Router,
    private user: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    const toast = await this.toastController.create({
      message: `Неверный адрес электронной почты или пароль`,
      duration: 5000
    });

    let data = { token: null };
    try {
      this.user.setAuth(this.username, this.password);
      data = await this.user.auth(this.username, this.password);
    } catch (e) {
      console.log(e);
      await toast.present();
      return;
    }

    await this.storage.set('token', data.token);
    this.router.navigateByUrl('/tabs/profile');
  }

}
