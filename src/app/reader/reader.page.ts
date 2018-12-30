import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/core';
import { IPostFull } from 'src/core/interfaces';
import { ModalController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, public loadingController: LoadingController) {
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
    this.chapter = Object.keys(this.info.episodes)[0];
    console.log(this.chapter);

    await this.spiner.dismiss();
  }
}
