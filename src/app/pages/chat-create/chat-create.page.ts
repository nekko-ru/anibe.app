import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IChat, IUser } from 'src/app/providers/interfaces';
import { ChatService } from 'src/app/providers/chat.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.page.html',
  styleUrls: ['./chat-create.page.scss'],
})
export class ChatCreatePage implements OnInit {
  @Input() public info?: IChat;
  @Input() public title: string;
  public name: string;

  public users: IUser[] = [];
  public selectedUsers: IUser[] = [];
  public newinvite = '';

  constructor(
    private modalController: ModalController,
    private toast: ToastController,
    private chat: ChatService,
    private user: UserService
  ) { }

  ngOnInit() {
    if (this.info) {
      this.name = this.info.name;

      this.info.users.forEach(async (id: string) => {
        this.users.push(await this.user.get(id));
      });
    } else {
      // set default chat image
      this.info.picture = 'https://avatars.mds.yandex.net/get-pdb/1532603/ac56ac6f-b354-4c5b-bf06-533910e0fae8/s1200';
    }
  }

  public async save() {
    if (this.info) {
      await this.chat.editChat(this.info.id, this.info.name, this.info.picture);
    } else {
      await this.chat.createChat(this.name, this.info.picture);
    }
    console.log(this);

    this.modalController.dismiss();
  }

  public async remove(id: string) {
    await this.chat.actionsChat(this.info.id, id, 'ban');
    this.users = this.users.filter((v: any) => v.id !== id);
  }

  public async invite() {
    try {
      const user = await this.user.getName(this.newinvite);
      await this.chat.actionsChat(this.info.id, user.id, 'add');

      this.users.push(user);
    } catch (e) {
      console.error(e);

      (await this.toast.create({
        message: 'Пользователь с таким ником не найден!',
        duration: 5000
      })).present();
    }
  }
}
