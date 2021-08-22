import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  get isAuthenticated(): boolean {
    return this.userService.isAuthenticated()
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin()
  }

  get isAgent(): boolean {
    return this.userService.isAgent()
  }

  get isRegularUser(): boolean {
    return this.userService.isRegularUser()
  }

  onClickLogin(): void {
    this.router.navigate(['/login'])
  }

  onClickRegister(): void {
    this.router.navigate(['/register'])
  }

  onClickLogout(): void {
    this.userService.logout()
    this.router.navigate(['/login'])
  }

  onClickFavorites(): void {
    this.router.navigate(['/favorites'])
  }

  onClickSettings(): void {
    this.router.navigate(['/settings'])
  }

  onClickCreatePost(): void {
    this.router.navigate(['/create-post'])
  }

  onClickCampaings(): void {
    this.router.navigate(['/campaigns'])
  }

  onClickFollow(): void {
    this.router.navigate(['/follow'])
  }

  onClickSearch(): void {
    this.router.navigate(['/search'])
  }

  onClickMyProfile(): void {
    this.router.navigate(['/profile/' + this.userService.user.username])
  }
}
