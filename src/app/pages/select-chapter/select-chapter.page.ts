import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.page.html',
  styleUrls: ['./select-chapter.page.scss'],
})
export class SelectChapterPage implements OnInit {
  @Input() public chapters: string[];
  @Input() private selected: string;
  @Input() private allactives: { [k: string]: { chapter: string, page: number, pages: number } };

  constructor(private modalController: ModalController, private firebase: Firebase) { }

  async ngOnInit() {
    console.log(this);

    console.log(this.allactives[this.selected]);
    await this.firebase.setScreenName('select-chapter');
  }

  public savePicks(name: string) {
    this.modalController.dismiss({
      chapter: name,
    });
  }

  public getColor(name: string): string {
    if (this.allactives[name]) {
      if (this.allactives[name].page === this.allactives[name].pages) {
        return 'ended';
      } else {
        return 'active';
      }
    }
    return '';
  }
}
