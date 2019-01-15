import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { IPostFull } from 'src/app/providers/interfaces';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  private id: string;
  // фикс ошибок при пустой отрисовке
  private info: IPostFull | any = { cover: '', genre: [], episodes: {} };
  private spiner: any;

  private chapters: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private post: PostService
  ) {}

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
    this.info = await this.post.get(this.id);
    await this.spiner.dismiss();
  }

  private async Read() {
    this.router.navigateByUrl(`/reader/${this.id}`);
  }
}
