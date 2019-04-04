import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/providers/interfaces';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  public chats: IChat[] = [];

  constructor(
    private router: Router,
    private cs: ChatService
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
    this.chats = await this.cs.getAll();
  }
}
