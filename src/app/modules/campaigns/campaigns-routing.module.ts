import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent
  },
  {
    path: 'create',
    component: CreateCampaignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
