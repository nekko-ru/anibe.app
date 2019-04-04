import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IChat, IMessage } from 'src/app/providers/interfaces';

@Component({
  selector: 'app-chat-id',
  templateUrl: './chat-id.page.html',
  styleUrls: ['./chat-id.page.scss'],
})
export class ChatIdPage implements OnInit {

  private id: string;
  public chatinfo: IChat;
  public messages: IMessage;

  /**
   * @description contain current message
   */
  public editorMsg: string;

  private spiner: HTMLIonLoadingElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  public async send() {
    // todo this
  }

  private async load() {

    await this.spiner.dismiss();
  }
}
