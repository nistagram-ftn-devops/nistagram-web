import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite.models';
import { Post } from '../models/post.models';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService, private userService: UserService) { }

  addToFavorites(post: Post): Observable<Favorite> {
    const payload = new Favorite()
    payload.userId = this.userService.user.id
    payload.post = post
    return this.apiService.post(`${this.BASE_PATH}/post/favorite`, payload)
  }

  deleteFavorite(favoriteId: number) {
    return this.apiService.delete(`${this.BASE_PATH}/post/favorite/${favoriteId}`)
  }
}
