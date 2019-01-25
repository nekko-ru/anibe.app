import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  constructor(
    private storage: Storage,
    private router: Router,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    await this.firebase.setScreenName('intro');
  }

  public async end() {
    await this.storage.set('tutorialComplete', true);
    await this.firebase.logEvent('tutorial_complete', {});
    this.router.navigateByUrl('/');
  }
}
