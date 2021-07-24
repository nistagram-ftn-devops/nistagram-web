import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from '../models/media.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService) { }

  getImage(imageId: number): Observable<Media> {
    return this.apiService.get(`${this.BASE_PATH}/media/${imageId}`)
  }
}
