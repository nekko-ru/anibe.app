import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, IonContent } from '@ionic/angular';
import { IChat, IMessage, IUserSelf } from 'src/app/providers/interfaces';
import { ChatService } from 'src/app/providers/chat.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-chat-id',
  templateUrl: './chat-id.page.html',
  styleUrls: ['./chat-id.page.scss'],
})
export class ChatIdPage implements OnInit {

  private id: string;
  public chatinfo: IChat;
  public user: IUserSelf;
  public messages: IMessage[] = [];

  @ViewChild(IonContent) contentArea: IonContent;
  private page = 0;
  private attachments: any;

  /**
   * @description contain current message
   */
  public editorMsg: string;

  private spiner: HTMLIonLoadingElement;

  constructor(
    private cs: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private us: UserService,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });

    await this.spiner.present();
    await this.load();
    this.scrollToBottom();
  }

  public goBack() {
    this.router.navigateByUrl('/tabs/chats');
  }

  public async update(event: any) {
    this.load()
      .then(() => event.target.complete())
      .catch(() => event.target.cansel());
  }

  public async loadMore(event: any) {
    event.target.complete();
    // this.load()
    //   .then(() => event.target.complete())
    //   .then(() => this.scrollToBottom())
    //   .catch(() => event.target.cansel());
  }

  public async msgmenu(event: any) {
    console.log(this);
  }

  public openUser(id: string): void {
    this.router.navigateByUrl(`/user/${id}`);
  }

  public async send() {
    if (!this.editorMsg) {
      return;
    }
    const msg = await this.cs.createMessage(this.id, this.editorMsg, this.attachments);
    this.messages.push(msg);
    this.scrollToBottom();
  }

  private async load() {
    this.page += 1;
    this.user = await this.us.getSelf();
    const messages = await this.cs.getMessages(this.id, this.page);
    this.chatinfo = await this.cs.get(this.id);

    messages.forEach((msg: IMessage) => {
      this.messages.unshift(msg);
    });

    await this.spiner.dismiss();
  }

  /**
   * @description Позволяет спускаться вниз
   */
  private scrollToBottom() {
    setTimeout(() => {
      if (this.contentArea.scrollToBottom) {
        this.contentArea.scrollToBottom();
      }
    }, 0);
  }
}
