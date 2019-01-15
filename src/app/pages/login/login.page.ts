import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Post } from 'src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    await this.storage.set('logined', true);
    this.router.navigateByUrl('/');
  }

}
