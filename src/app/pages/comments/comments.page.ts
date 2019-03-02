import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/providers/post.service';
import { IComment, IPost } from 'src/app/providers/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  private id: string;
  public comments: IComment[];
  public info: IPost | any = { name: '' };
  public body: string;

  constructor(
    private post: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.comments = await this.post.getComments(this.id);
    this.info = await this.post.get(this.id);
  }

  public async createComment() {
    this.comments.push(await this.post.createComment(this.id, this.body));
    this.body = '';
  }
}
