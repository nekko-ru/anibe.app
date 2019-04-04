import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IChat, IMessage, IUserSelf } from 'src/app/providers/interfaces';
import { ChatService } from 'src/app/providers/chat.service';
import { Storage } from '@ionic/storage';

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

  private page: number = 0;
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
    private storage: Storage,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });

    this.user = <IUserSelf> await this.storage.get('user_local');

    await this.spiner.present();
    await this.load();
  }

  public async msgmenu(event: any) {
    console.log(this);
  }

  public async send() {
    const msg = await this.cs.createMessage(this.id, this.editorMsg, this.attachments)
    this.messages.push(msg);
  }

  public online(): number {
    const online = this.chatinfo.users.filter((u) => u.online !== '0');
    return online.length;
  }

  private async load() {
    // this.messages = await this.cs.getMessages(this.id, this.page);
    // this.chatinfo = await this.cs.get(this.id);
    await this.spiner.dismiss();
  }
}
