import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/providers/interfaces';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/providers/chat.service';
import { ModalController } from '@ionic/angular';
import { ChatCreatePage } from '../chat-create/chat-create.page';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  public chats: IChat[] = [];

  constructor(
    private router: Router,
    private cs: ChatService,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
    await this.load();
  }

  public async createChat() {
    const modal = await this.modalController.create({
      component: ChatCreatePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  public async update(event: any) {
    this.load()
      .then(() => event.target.complete())
      .catch(() => event.target.cansel());
  }

  public async open(id: string) {
    this.router.navigateByUrl(`/chat-id/${id}`);
  }

  private async load(): Promise<any> {
    this.chats = await this.cs.getAll();
  }
}
