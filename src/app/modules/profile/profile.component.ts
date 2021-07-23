import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string
  user: User = new User()

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.getUser()
  }

  private getUser(): void {
    this.userService.getUserInfo(this.username).subscribe((res: User) => {
      this.user = res
    })
  }
}
