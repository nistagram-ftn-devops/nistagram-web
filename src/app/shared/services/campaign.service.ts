import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign.models';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private readonly BASE_PATH = environment.apiBasePath

  constructor(private apiService: ApiService, private userService: UserService) { }

  getMyCampaigns(): Observable<Campaign[]> {
    return this.apiService.get(this.BASE_PATH + '/campaign/author/' + this.userService.user.id)
  }

  delete(id: number) {
    return this.apiService.delete(this.BASE_PATH + '/campaign/' + id)
  }
}
