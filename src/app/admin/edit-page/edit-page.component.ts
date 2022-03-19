import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { Subscription, switchMap } from 'rxjs';
import { Post } from '../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public form!: FormGroup;
  public post!: Post;
  public submitted = false;

  private updateSubscription!: Subscription;

  constructor(
      private route: ActivatedRoute,
      private postsService: PostsService,
      private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getOne(params['id'])
    })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  public ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubscription = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Post updated');
    })
  }
}
