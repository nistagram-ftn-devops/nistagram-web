import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService) { }

  getPostsForUser(id: number): Observable<Post[]> {
    return this.apiService.get(`${this.BASE_PATH}/post/post/user/${id}`)
  }
}
