import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  keyword: string = ''
  posts: Post[] = []

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this.keyword === '') this.toastr.warning('Enter search keyword')

    this.postService.search(this.keyword).subscribe((res: Post[]) => {
      console.log(res)
      this.posts = res

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
}
