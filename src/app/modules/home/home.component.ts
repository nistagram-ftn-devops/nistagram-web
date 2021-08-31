import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.models';
import { Follow } from 'src/app/shared/models/follow.models';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { FollowService } from 'src/app/shared/services/follow.service';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = []
  campaigns: Campaign[] = []

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,  
    private mediaService: MediaService,
    private followService: FollowService,
    private campaignService: CampaignService,
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  get isAuthenticated(): boolean {
    return this.userService.isAuthenticated()
  }

  onClickLogin(): void {
    this.router.navigate(['/login'])
  }

  onClickRegister(): void {
    this.router.navigate(['/register'])
  }

  getPosts(): void {
    if (!this.userService.isAuthenticated()) return

    this.followService.getMyFollowing().subscribe((resFollow: Follow[]) => {
      console.log('follow', resFollow)
      
      const userIds = resFollow.map(r => r.followeeId)
      console.log(userIds)

      if (userIds.length === 0) return

      this.postService.home(userIds).subscribe((res: Post[]) => {
        this.posts = res
        
        for (let p of this.posts) {
          this.mediaService.getImage(p.imageId).subscribe((res: Media) => {
            p.media = res
          })
        }
        console.log(this.posts)
      })

      this.campaignService.home(userIds).subscribe((res: Campaign[]) => {
        console.log('kampanje', res)
        this.campaigns = res

        for (let c of this.campaigns) {
          this.mediaService.getImage(c.imageId).subscribe((res: Media) => {
            c.media = res
          })
        }
      })
    })
  }

  goToPost(post: Post): void {
    this.router.navigate(['/post/' + post.id])
  }
}
