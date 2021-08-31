import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating, RatingType } from '../models/rating.models';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService, private userService: UserService) { }

  getLikes(postId: number): Observable<Rating[]> {
    return this.apiService.get(this.BASE_PATH + '/post/rating/likes/' + postId)
  }

  getDislikes(postId: number): Observable<Rating[]> {
    return this.apiService.get(this.BASE_PATH + '/post/rating/dislikes/' + postId)
  }

  like(postId: number): Observable<Rating> {
    const payload = {
      post: { id: postId },
      userId: this.userService.user.id,
      type: 'like'
    }
    return this.apiService.post(this.BASE_PATH + '/post/rating', payload)
  }

  dislike(postId: number): Observable<Rating> {
    const payload = {
      post: { id: postId },
      userId: this.userService.user.id,
      type: 'dislike'
    }
    return this.apiService.post(this.BASE_PATH + '/post/rating', payload)
  }

  removeRating(postId: number): Observable<Rating> {
    const payload = {
      post: { id: postId },
      userId: this.userService.user.id,
    }
    return this.apiService.patch(this.BASE_PATH + '/post/rating', payload)
  }
}
