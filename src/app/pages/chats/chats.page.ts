import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/providers/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  public chats: IChat[] = [];

  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    await this.load();
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
    this.chats = [
      {
        id: '1',
        name: 'Chat nomer odin',
        picture: 'https://cdn.anibe.ru/avatars/5c533dbb889e940019ec1d9c/1551757027703',
        users: [],
        lastmessage: {
          id: '12312312',
          body: 'some text',
          user: {
            id: '12',
            name: 'deissh',
            online: '1',
            badges: [],
            picture: 'https://cdn.anibe.ru/avatars/5c533dbb889e940019ec1d9c/1551757027703',
            role: 'admin'
          },
          createdAt: '12.03.2019',
          updatedAt: '04.04.2019',
        },
        createdAt: '12.03.2019',
        updatedAt: '04.04.2019',
      }
    ];
  }
}
