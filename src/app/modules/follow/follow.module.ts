import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './follow.component';
import { FollowRoutingModule } from './follow-routing.module';



@NgModule({
  declarations: [
    FollowComponent
  ],
  imports: [
    CommonModule,
    FollowRoutingModule,
  ]
})
export class FollowModule { }
