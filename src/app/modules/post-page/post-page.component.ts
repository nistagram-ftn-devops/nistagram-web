import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id']
    this.getPost()
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
}
