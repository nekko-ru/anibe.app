import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { Router } from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';
import { INotif } from 'src/app/providers/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notif: INotif[];

  constructor(
    private user: UserService,
    private router: Router,
    private storage: Storage,
    private firebase: Firebase
  ) { }

  ngOnInit() {
  }

  public async openUrl(url: string) {
    await this.router.navigateByUrl(url);
  }

  protected async ionViewDidEnter() {
    await this.load();

    const counter: any = document.getElementById('notif-count');
    counter.innerHTML = '';
  }

  private async load() {
    this.notif = await this.user.getNotif();
  }
}
