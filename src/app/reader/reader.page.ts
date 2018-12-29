import { Component, OnInit } from '@angular/core';
import { Post } from 'src/core';
import { ActivatedRoute } from '@angular/router';
import { IPostFull } from 'src/core/interfaces';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {
  private info: IPostFull;
  private currentChapter;
  private Post: Post;

  constructor(private route: ActivatedRoute) {
    this.Post = new Post();
  }

  async ngOnInit() {
    this.info = await this.Post.get(this.route.snapshot.paramMap.get('id'));
  }
}
