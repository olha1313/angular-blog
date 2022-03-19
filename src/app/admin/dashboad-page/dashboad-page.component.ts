import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboad-page',
  templateUrl: './dashboad-page.component.html',
  styleUrls: ['./dashboad-page.component.scss']
})
export class DashboadPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public search = '';
  private postsSubscription!: Subscription;
  private deletePostsSubscription!: Subscription;

  constructor(private postsService: PostsService, private alertService: AlertService) { }

  public ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.deletePostsSubscription) {
      this.deletePostsSubscription.unsubscribe();
    }
  }

  public remove(id?: string) {
    this.deletePostsSubscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Post deleted');
    })
  }
}
