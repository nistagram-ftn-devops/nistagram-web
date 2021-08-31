import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Follow } from '../models/follow.models';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService, private userService: UserService) { }

  follow(followeeId: number): Observable<Follow> {
    const payload = {
      followerId: this.userService.user.id,
      followeeId: followeeId
    }
    return this.apiService.post(this.BASE_PATH + '/user/follow', payload)
  }

  getFollowRequests(): Observable<Follow[]> {
    return this.apiService.get(this.BASE_PATH + '/user/follow/requests/' + this.userService.user.id)
  }

  acceptRequest(reqId: number): Observable<Follow> {
    return this.apiService.post(this.BASE_PATH + '/user/follow/' + reqId + '/accept', {})
  }

  declineRequest(reqId: number): Observable<Follow> {
    return this.apiService.post(this.BASE_PATH + '/user/follow/' + reqId + '/decline', {})
  }

  doIFollow(userId: number): Observable<Follow[]> {
    const payload = {
      me: this.userService.user.id,
      user: userId,
    }
    return this.apiService.post(this.BASE_PATH + '/user/follow/do-i-follow', payload)
  }

  getMyFollowing(): Observable<Follow[]> {
    const userId = this.userService.user.id
    return this.apiService.get(this.BASE_PATH + '/user/follow/following/' + userId)
  }
}
