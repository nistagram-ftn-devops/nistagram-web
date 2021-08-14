import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';



@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileSettingsModule { }
