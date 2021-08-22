import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,  
  ) { }

  ngOnInit(): void {
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

}
