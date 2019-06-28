import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, ActionSheetController } from '@ionic/angular';
import { IPostFull } from 'src/app/services/interfaces';
import { PostService } from 'src/app/services/post.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { UserService } from 'src/app/services/user.service';
import { ReportPage } from 'src/app/modal/report/report.page';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  private id: string;
  // фикс ошибок при пустой отрисовке
  public info: IPostFull | any = { cover: '', genre: [], episodes: {} };
  private spiner: any;

  private chapters: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private post: PostService,
    private user: UserService,
    private storage: AppState,
    private asc: ActionSheetController,
    private modalController: ModalController,
    private firebase: Firebase
  ) {}

  async ngOnInit() {
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();

    this.id = this.route.snapshot.paramMap.get('id');
    await this.load();
    await this.firebase.setScreenName('info');
    await this.firebase.logEvent('select_content', { item_id: this.id, content_type: 'manga' });
  }

  private async load(full: boolean = false) {
    const temp = await this.storage.get(`info_${this.id}`);
    if (temp && !full) {
      this.info = temp;
    } else {
      Object.assign(this.info, await this.post.get(this.id));
      await this.storage.set(`info_${this.id}`, this.info);
    }

    await this.spiner.dismiss();
  }

  public async Read() {
    this.router.navigateByUrl(`/reader/${this.id}`);
  }

  public async Comments() {
    this.router.navigateByUrl(`/comments/${this.id}`);
  }

  public async showMore() {
    const actionSheet = await this.asc.create({
      buttons: [
        {
          text: 'Буду читать',
          handler: async (): Promise<any> => {
            await this.post.addToList(this.id, 'willread');
            await this.storage.set('user_local', await this.user.getSelf());
          }
        },
        {
          text: 'Читаю',
          handler: async (): Promise<any> => {
            await this.post.addToList(this.id, 'inprogress');
            await this.storage.set('user_local', await this.user.getSelf());
          }
        },
        {
          text: 'Прочитано',
          handler: async (): Promise<any> => {
            await this.post.addToList(this.id, 'readed');
            await this.storage.set('user_local', await this.user.getSelf());
          }
        },
        {
          text: 'Любимое',
          handler: async (): Promise<any> => {
            await this.post.addToList(this.id, 'favorite');
            await this.storage.set('user_local', await this.user.getSelf());
          }
        },
        {
          text: 'Брошено',
          handler: async (): Promise<any> => {
            await this.post.addToList(this.id, 'thrown');
            await this.storage.set('user_local', await this.user.getSelf());
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  public async report() {
    const modal = await this.modalController.create({
      component: ReportPage,
      componentProps: {
        post_id: this.id
      }
    });
    await modal.present();
    await modal.onDidDismiss();
  }
}
