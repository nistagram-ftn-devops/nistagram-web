import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.models';
import { CampaignService } from 'src/app/shared/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns: Campaign[] = []

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.getMyCampaigns()
  }

  private getMyCampaigns(): void {
    this.campaignService.getMyCampaigns().subscribe((res: Campaign[]) => {
      this.campaigns = res
    })
  }
}
