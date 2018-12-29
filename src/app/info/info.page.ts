import { Component, OnInit } from '@angular/core';
import { IPostFull } from 'src/core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  private id: string;
  private liked = 'heart-empty';
  private Post: Post;
  // фикс ошибок при пустой отрисовке
  private info: IPostFull | any = { cover: '', genre: [] };
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

    this.id = this.route.snapshot.paramMap.get('id');
    await this.load();
  }

  private async load() {
    this.info = await this.Post.get(this.id);
    await this.spiner.dismiss();
  }
}
