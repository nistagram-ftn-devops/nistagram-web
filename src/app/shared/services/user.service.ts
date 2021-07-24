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
    this.user = user.user
    this.token = user.token
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
  }

  register(payload: UserRegistration): Observable<User> {
    return this.apiService.post(`${this.BASE_PATH}/user/user/register`, payload)
  }

  getAllAgents(): Observable<User[]> {
    return this.apiService.get(`${this.BASE_PATH}/user/user/agents`)
  }

  approveAgent(id: number): Observable<User> {
    return this.apiService.get(`${this.BASE_PATH}/user/user/${id}/accept`)
  }

  declineAgent(id: number): Observable<User> {
    return this.apiService.get(`${this.BASE_PATH}/user/user/${id}/decline`)
  }

  getUserInfo(username: string): Observable<User> {
    return this.apiService.get(`${this.BASE_PATH}/user/user/profile/${username}`)
  }

  getUserInfoById(id: number): Observable<User> {
    return this.apiService.get(`${this.BASE_PATH}/user/user/profile/id/${id}`)
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user'))
  }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
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
