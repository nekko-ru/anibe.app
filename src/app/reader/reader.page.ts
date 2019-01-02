import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Post } from 'src/core';
import { IPostFull } from 'src/core/interfaces';
import { ModalController, LoadingController, Events, IonSlide } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {
  private info: IPostFull;
  private chapter: string;

  private Post: Post;
  private spiner: any;
  @ViewChild('mySlider') private slider: any;

  private lastactive: { chapter: string, page: number };

  // tslint:disable-next-line:max-line-length
  constructor(private events: Events, private storage: Storage, private route: ActivatedRoute, public loadingController: LoadingController) {
    this.Post = new Post();
  }

  async ngOnInit() {
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();

    this.info = await this.Post.get(this.route.snapshot.paramMap.get('id'));

    // получаем первую главу
    // todo: добавить возможноть открывать последнию главу

    this.lastactive = await this.storage.get(this.info.id);
    if (this.lastactive !== null) {
      console.log(this.lastactive);

      this.chapter = this.lastactive.chapter;
      this.slider.slideTo(this.lastactive.page);
    } else {
      this.chapter = Object.keys(this.info.episodes)[0];
      this.lastactive.page = 1;
    }

    await this.spiner.dismiss();
  }

  private async sliderEvent() {
    console.log('slider changed');

    this.lastactive = {
      chapter: this.chapter,
      // fixme:
      page: await this.slider.getActiveIndex()
    };

    await this.storage.set(this.info.id, this.lastactive);
  }
}
