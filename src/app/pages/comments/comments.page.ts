import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/providers/post.service';
import { IComment, IPost } from 'src/app/providers/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ToastController } from '@ionic/angular';
import { ReportService } from 'src/app/providers/report.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private id: string;
  public comments: IComment[];
  public info: IPost | any = { name: '' };
  public body: string;
  public local_user: any;

  private page = 1;

  @ViewChild('myList') private slidingList: any;

  constructor(
    private rep: ReportService,
    private post: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private firebase: Firebase,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    // получаем айдишник манги для которой нужно отобразить коменты
    this.id = this.route.snapshot.paramMap.get('id');
    this.load();

    // выставяем для фаербейза страницу
    this.firebase.setScreenName('comments');
  }

  public async createComment() {
    if (!this.body) {
      return;
    }
    // отправляем через апи новый комент и результат записываем в начало массива
    this.comments.unshift(await this.post.createComment(this.id, this.body));
    // обнуляем форму
    this.body = '';
  }

  public reply(nick: string) {
    // добавляем в форму ник пользователя которому нужно ответить
    this.body = `${nick}, `;
  }

  public async loadMore(event: any) {
    // увеличиваем текущию страницу на 1 для того что бы загрузить новую
    this.page += 1;
    this.comments = this.comments.concat(await this.post.getComments(this.id, this.page));
    // завершаем кручение спинера при загрузке
    event.target.complete();
  }

  public async delete(item: IComment) {
    await this.slidingList.closeOpened();
    // проверяем что пользователь являеться автором комента или админом
    if (item.user.id !== this.local_user.id && this.local_user.role === 'user') {
      (await this.toast.create({
        message: 'Вы не можете удалить чужой комментарий!',
        duration: 5000
      })).present();
      return;
    }

    try {
      // отправляем запрос с апи для удаления
      await this.post.deleteComment(item.id);

      // удаляем из списка коментов наш комент (точнее фильтруем)
      this.comments = this.comments.filter((v) => v.id !== item.id);
    } catch (e) {
      // логируем в консоль браузера
      console.error(e);
      // логируем в фаербейс
      await this.firebase.logError(e);
      (await this.toast.create({
        message: 'Ошибка при удалении, попробуйте чуть позже',
        duration: 5000
      })).present();
    }
  }

  public async report(item: IComment) {
    try {
      await this.rep.send({
        body: 'comment',
        post_id: this.id,
        user_id: item.user.id,
        authod_id: this.local_user.id
      });

      (await this.toast.create({
        message: 'Спасибо за репорт!',
        duration: 5000
      })).present();
    } catch (e) {
      // логируем в консоль браузера
      console.error(e);
      // логируем в фаербейс
      await this.firebase.logError(e);
      (await this.toast.create({
        message: 'Ошибка при отправке, попробуйте чуть позже',
        duration: 5000
      })).present();
    }
  }

  private async load() {
    this.comments = await this.post.getComments(this.id);
    this.info = await this.post.get(this.id);

    this.local_user = await this.storage.get('user_local');
  }

  public openUser(id: string): void {
    this.router.navigateByUrl(`/user/${id}`);
  }

  public async ionViewWillLeave() {
    await this.slidingList.closeOpened();
  }
}
