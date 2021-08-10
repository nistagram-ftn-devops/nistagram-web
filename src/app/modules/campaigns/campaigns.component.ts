import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Campaign } from 'src/app/shared/models/campaign.models';
import { CampaignService } from 'src/app/shared/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns: Campaign[] = []

  constructor(
    private campaignService: CampaignService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMyCampaigns()
  }

  private getMyCampaigns(): void {
    this.campaignService.getMyCampaigns().subscribe((res: Campaign[]) => {
      this.campaigns = res
    })
  }

  remove(campaign: Campaign): void {
    this.campaignService.delete(campaign.id).subscribe(() => {
      this.getMyCampaigns()
      this.toastr.success('Campaign removed')
    }, error => {
      this.toastr.error('Error while removing campaign')
    })
  }

  addCampaign(): void {
    this.router.navigate(['/campaigns/create'])
  }
}
