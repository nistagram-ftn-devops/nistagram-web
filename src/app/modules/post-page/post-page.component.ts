import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Favorite } from 'src/app/shared/models/favorite.models';
import { Media } from 'src/app/shared/models/media.models';
import { Comment, Post } from 'src/app/shared/models/post.models';
import { Rating } from 'src/app/shared/models/rating.models';
import { User } from 'src/app/shared/models/user.models';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';
import { RatingService } from 'src/app/shared/services/rating.service';
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
  isFavorite = false
  favorite: Favorite
  numLikes = 0
  numDislikes = 0

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private mediaService: MediaService,
    private favoriteService: FavoriteService,
    private toastr: ToastrService,
    private ratingService: RatingService,
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

      this.favoriteService.getMyFavorites().subscribe((res: Favorite[]) => {
        this.favoriteService.myFavorites = res
        this.favorite = this.favoriteService.isPostInFavorites(this.postId)  
        if (this.favorite) this.isFavorite = true
      })

      this.getLikesDislikes()
    })
  }

  private getLikesDislikes() {
    this.ratingService.getLikes(this.postId).subscribe((res: Rating[]) => {
      this.numLikes = res.length
    })

    this.ratingService.getDislikes(this.postId).subscribe((res: Rating[]) => {
      this.numDislikes = res.length
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

  addToFavorite(): void {
    this.favoriteService.addToFavorites(this.post).subscribe((res: Favorite) => {
      this.toastr.success('Post added to favorites')
      this.isFavorite = true
      this.favorite = res
    }, err => {
      this.toastr.error('Error while adding post to favorites')
    })
  }

  removeFavorite(): void {
    this.favoriteService.deleteFavorite(this.favorite.id).subscribe(() => {
      this.toastr.success('Post removed from favorites')
      this.isFavorite = false
    }, err => {
      this.toastr.error('Error while removing post from favorites')
    })
  }

  like(): void {
    this.ratingService.like(this.postId).subscribe((res: Rating) => {
      this.getLikesDislikes()
      this.toastr.success('Post liked')
    }, err => {
      if (err.error.message === 'already-rated')
        this.toastr.error('Post already liked')
      else 
        this.toastr.error('Error while liking this post')
    })
  }

  dislike(): void {
    this.ratingService.like(this.postId).subscribe((res: Rating) => {
      this.getLikesDislikes()
      this.toastr.success('Post disliked')
    }, err => {
      if (err.error.message === 'already-rated')
        this.toastr.error('Post already disliked')
      else 
        this.toastr.error('Error while disliking this post')
    })
  }

  removeRating(): void {
    this.ratingService.removeRating(this.postId).subscribe(() => {
      this.getLikesDislikes()
      this.toastr.success('Your rating is removed for this post')
    }, err => {
      this.toastr.error('Error while removing rating from this post')
    })
  }
}
