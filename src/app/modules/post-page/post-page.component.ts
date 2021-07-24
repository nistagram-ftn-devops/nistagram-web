import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/shared/models/media.models';
import { Comment, Post } from 'src/app/shared/models/post.models';
import { User } from 'src/app/shared/models/user.models';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  postId: number
  post: Post
  author: User
  imageUrl: string = ''
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private mediaService: MediaService,
  ) { }

  get isAuthenticated(): boolean {
    return this.userService.isAuthenticated()
  }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id']
    this.getPost()

    this.form = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  private getPost(): void {
    this.postService.getPost(this.postId).subscribe((res: Post) => {
      this.post = res
      this.getAuthor(this.post.authorId)
      this.getImage(this.post.imageId)

      for (let c of this.post.comments) {
        this.userService.getUserInfoById(c.authorId).subscribe((res: User) => {
          c.author = res
        })
      }
    })
  }

  private getAuthor(id: number) {
    this.userService.getUserInfoById(id).subscribe((res: User) => {
      this.author = res
    })
  }

  private getImage(id: number) {
    this.mediaService.getImage(id).subscribe((res: Media) => {
      this.imageUrl = res.ImageUrl
    })
  }

  submit(): void {
    const text = this.form.controls.comment.value

    this.postService.postComment(text, this.postId).subscribe((res: Post) => {
      const comment = new Comment()
      comment.author = new User()
      comment.author.username = this.author.username
      comment.text = text
      comment.createdAt = new Date().toString()
      this.post.comments.push(comment)
      this.form.controls.comment.setValue('')
    })
  }
}
