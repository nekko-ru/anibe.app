import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IChat, IMessage, IUserSelf } from 'src/app/providers/interfaces';
import { ChatService } from 'src/app/providers/chat.service';
import { Storage } from '@ionic/storage';
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
  public messages: IMessage[];

  private page: number = 1;
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
  }

  public async update(event: any) {
    this.load()
      .then(() => event.target.complete())
      .catch(() => event.target.cansel());
  }

  public async msgmenu(event: any) {
    console.log(this);
  }

  public async send() {
    const msg = await this.cs.createMessage(this.id, this.editorMsg, this.attachments)
    this.messages.push(msg);
  }

  private async load() {
    this.user = await this.us.getSelf();
    this.messages = (await this.cs.getMessages(this.id, this.page)).reverse();
    this.chatinfo = await this.cs.get(this.id);
    await this.spiner.dismiss();
  }
}
