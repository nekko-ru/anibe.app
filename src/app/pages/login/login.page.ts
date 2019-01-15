import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/providers/user.service';

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
    private user: UserService
  ) { }

  ngOnInit() {
  }

  async login() {
    this.user.setAuth(this.username, this.password);
    const data = await this.user.auth(this.username, this.password);

    await this.storage.set('token', data.token);
    this.router.navigateByUrl('/');
  }

}
