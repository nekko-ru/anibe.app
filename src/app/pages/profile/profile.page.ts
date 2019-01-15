import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private info: any = {
    name: '',
    picture: '',
    favorite: [],
    inprogress: [],
    readed: [],
    thrown: []
  };
  private token: string;

  constructor(
    private storage: Storage,
    private router: Router,
    private user: UserService,
  ) { }

  async ngOnInit() {
    this.info = await this.user.getSelf();
  }

}
