import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboad-page',
  templateUrl: './dashboad-page.component.html',
  styleUrls: ['./dashboad-page.component.scss']
})
export class DashboadPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  postsSubscription!: Subscription;

  constructor(private postsService: PostsService) { }

  public ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  public remove(id?: string) {

  }
}
