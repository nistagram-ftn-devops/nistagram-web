import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserLogin, UserRegistration, UserRole } from '../models/user.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService) { }

  isAuthenticated(): boolean {
    return this.token !== null
  }

  isAdmin(): boolean {
    return this.role === UserRole.admin
  }

  isAgent(): boolean {
    return this.role === UserRole.agent
  }

  login(payload: { username: string, password: string}): Observable<UserLogin> {
    return this.apiService.post(`${this.BASE_PATH}/user/auth/login`, payload)
  }

  loginUser(user: UserLogin): void {
    this.role = user.user.role
    this.token = user.token
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  register(payload: UserRegistration): Observable<User> {
    return this.apiService.post(`${this.BASE_PATH}/user/user/register`, payload)
  }

  set token(jwt: string) {
    localStorage.setItem('token', jwt)
  }

  get token(): string {
    return localStorage.getItem('token')
  }

  set role(role: string) {
    localStorage.setItem('role', role)
  }

  get role(): string {
    return localStorage.getItem('role')
  }
}