import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.page.html',
  styleUrls: ['./select-chapter.page.scss'],
})
export class SelectChapterPage implements OnInit {
  @Input() public stats: {
    readed: string[],
    inprogress: string[],
    all: string[],
    last: string
  };

  constructor(private modalController: ModalController, private firebase: Firebase) { }

  async ngOnInit() {
    console.log(this);
    await this.firebase.setScreenName('select-chapter');
  }

  public savePicks(name: string) {
    this.stats.last = name;
    this.modalController.dismiss(this.stats);
  }

  public getColor(name: string): string {
    if (name in this.stats.inprogress) {
      return 'ended';
    }
    if (name in this.stats.readed) {
      return 'ended';
    }
    return '';
  }
}
