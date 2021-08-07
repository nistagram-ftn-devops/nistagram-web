import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { RegisterAgentComponent } from './register-agent/register-agent.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent
  },
  {
    path: 'register-agent',
    component: RegisterAgentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
