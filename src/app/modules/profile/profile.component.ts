import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { User } from 'src/app/shared/models/user.models';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string
  user: User = new User()
  posts: Post[] = []

  constructor(private activatedRoute: ActivatedRoute, 
              private userService: UserService,
              private postService: PostService,
              private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.getUser()
  }

  private getUser(): void {
    this.userService.getUserInfo(this.username).subscribe((res: User) => {
      this.user = res
      this.getPosts(this.user.id)
    })
  }

  private getPosts(id: number): void {
    this.postService.getPostsForUser(id).subscribe((res: Post[]) => {
      this.posts = res
      console.log(this.posts)
      for (let p of this.posts) {
        this.mediaService.getImage(p.imageId).subscribe((res: Media) => {
          p.media = res
        })
      }
    })
  }
}
