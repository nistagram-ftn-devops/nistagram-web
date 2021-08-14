import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampaignsComponent,
    CreateCampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CampaignsModule { }
