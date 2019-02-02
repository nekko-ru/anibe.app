import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.page.html',
  styleUrls: ['./viewlist.page.scss'],
})
export class ViewlistPage implements OnInit {
  @Input() public name: string;
  @Input() public list: any[];
  @ViewChild('myList') private slidingList: any;

  public mode: boolean;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    private router: Router,
    private post: PostService,
    private asc: ActionSheetController
  ) { }

  ngOnInit() {
  }

  private async ionViewWillLeave() {
    await this.slidingList.closeOpened();
  }

  /**
   * @description открывает выбраную мангу
   * @param id uuid манги
   * @public
   */
  public open(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
    this.modalController.dismiss();
  }

  /**
   * @description переключает режим отображения
   * @public
   */
  public togle() {
    this.mode = !this.mode;
  }

  /**
   * @description Позволяет удалит из списка выбраную мангу
   * @param {string} id
   * @async
   * @public
   */
  public async remove(id: string) {
    const actionSheet = await this.asc.create({
      header: 'Вы точно хотите удалить?',
      buttons: [{
        text: 'Да',
        role: 'destructive',
        icon: '',
        handler: async () => {
          await this.slidingList.closeOpened();
          this.list = this.list.filter((v: any) => v.id !== id);
          await this.post.removeFromList(id);
        }
      }, {
        text: 'Отмена',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  /**
   * @description позволяет перенести между списками мангу
   * @param {string} id uuid manga
   * @async
   * @public
   */
  public async move(id: string) {
    const actionSheet = await this.asc.create({
      buttons: [
        {
          text: 'Читаю',
          handler: () => {
            this.post.addToList(id, 'inprogress');
            this.list = this.list.filter((v: any) => v.id !== id);
          }
        },
        {
          text: 'Прочитано',
          handler: () => {
            this.post.addToList(id, 'readed');
            this.list = this.list.filter((v: any) => v.id !== id);
          }
        },
        {
          text: 'Любимое',
          handler: () => {
            this.post.addToList(id, 'favorite');
            this.list = this.list.filter((v: any) => v.id !== id);
          }
        },
        {
          text: 'Брошено',
          handler: () => {
            this.post.addToList(id, 'thrown');
            this.list = this.list.filter((v: any) => v.id !== id);
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    if (!this.mode) {
      await this.slidingList.closeOpened();
    }
    await actionSheet.present();
  }

  public async Close() {
    await this.modalController.dismiss();
  }
}
