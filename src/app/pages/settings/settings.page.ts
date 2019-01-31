import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public info: any;
  public showProfile: boolean;

  constructor(
    private user: UserService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.info = await this.storage.get('user_local');
    this.showProfile = this.info ? true : false;
  }

}
