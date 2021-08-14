import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.token
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });

    return next.handle(jsonReq);
  }

}