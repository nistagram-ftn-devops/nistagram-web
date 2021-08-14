import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Follow } from 'src/app/shared/models/follow.models';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { User } from 'src/app/shared/models/user.models';
import { FollowService } from 'src/app/shared/services/follow.service';
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
              private mediaService: MediaService,
              private router: Router,
              private followService: FollowService,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.getUser()
  }

  private getUser(): void {
    this.userService.getUserInfo(this.username).subscribe((res: User) => {
      this.user = res
      this.getPosts(this.user.id)
      
      if (this.userService.isAuthenticated()) {
        this.followService.doIFollow(res.id).subscribe((res) => {
          console.log(res)
          if (res.length !== 0) this.user.isPublic = true          
        })
      }
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

  goToPost(post: Post): void {
    this.router.navigate(['/post/' + post.id])
  }

  follow(): void {
    this.followService.follow(this.user.id).subscribe((follow: Follow) => {
      this.toastr.success('Follow request sent')
    }, err => {
      if (err.error.message === 'follow-exists')
        this.toastr.error('You are already following this person')
      else 
        this.toastr.error('Error while sending follow request')
    })
  }
}
