import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';



@NgModule({
  declarations: [
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule
  ]
})
export class CampaignsModule { }
