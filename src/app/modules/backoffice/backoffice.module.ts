import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from './backoffice.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AgentsTableComponent } from './agents-table/agents-table.component';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BackofficeComponent,
    AgentsTableComponent,
    RegisterAgentComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
