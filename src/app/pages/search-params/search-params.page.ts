import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-params',
  templateUrl: './search-params.page.html',
  styleUrls: ['./search-params.page.scss'],
})
export class SearchParamsPage implements OnInit {
  // добавить нормальные жанры
  @Input() genres: any[];

  constructor(navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  }

  savePicks() {
    this.modalController.dismiss({
      genres: this.genres
    });
  }

}
