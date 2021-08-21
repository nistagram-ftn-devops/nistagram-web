import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.models';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService, private userService: UserService) { }

  getPostsForUser(id: number): Observable<Post[]> {
    return this.apiService.get(`${this.BASE_PATH}/post/post/user/${id}`)
  }

  getPost(id: number): Observable<Post> {
    return this.apiService.get(`${this.BASE_PATH}/post/post/${id}`)
  }

  postComment(text: string, id: number): Observable<Post> {
    const authorId = this.userService.user.id
    return this.apiService.post(`${this.BASE_PATH}/post/post/${id}/comment`, { text, authorId })
  }

  createPost(post: Post): Observable<Post> {
    return this.apiService.post(`${this.BASE_PATH}/post/post`, post)
  }

  search(keyword: string): Observable<Post[]> {
    return this.apiService.get(`${this.BASE_PATH}/post/post/search/` + keyword)
  }
}
