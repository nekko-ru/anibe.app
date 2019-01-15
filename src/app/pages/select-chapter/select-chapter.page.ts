import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.page.html',
  styleUrls: ['./select-chapter.page.scss'],
})
export class SelectChapterPage implements OnInit {
  @Input() private chapters: string[];
  @Input() private selected: string;
  @Input() private allactives: string[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  savePicks(name: string) {
    this.modalController.dismiss({
      chapter: name,
    });
  }

}
