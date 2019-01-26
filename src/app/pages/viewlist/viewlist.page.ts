import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.page.html',
  styleUrls: ['./viewlist.page.scss'],
})
export class ViewlistPage implements OnInit {
  @Input() public name: string;
  @Input() public list: any[];

  public mode: boolean;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public open(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
    this.modalController.dismiss();
  }

  public togle() {
    this.mode = !this.mode;
  }
}