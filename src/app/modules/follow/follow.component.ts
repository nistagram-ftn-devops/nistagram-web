import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Follow } from 'src/app/shared/models/follow.models';
import { FollowService } from 'src/app/shared/services/follow.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  followRequests: Follow[] = []

  constructor(
    private followService: FollowService,
    private toastr: ToastrService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getFollowRequests()
  }

  getFollowRequests(): void {
    this.followService.getFollowRequests().subscribe((res: Follow[]) => {
      this.followRequests = res

      for (const r of this.followRequests) {
        this.userService.getUserInfoById(r.followerId).subscribe(res2 => r.user = res2)
      }
    })
  }

  accept(id: number): void {
    this.followService.acceptRequest(id).subscribe((res: Follow) => {
      this.toastr.success('Follow request accepted')
      this.getFollowRequests()
    }, err => {
      this.toastr.error('Error while accepting follow reqeust')
    })
  }

  decline(id: number): void {
    this.followService.acceptRequest(id).subscribe((res: Follow) => {
      this.toastr.success('Follow request declined')
      this.getFollowRequests()
    }, err => {
      this.toastr.error('Error while declining follow reqeust')
    })
  }
}
