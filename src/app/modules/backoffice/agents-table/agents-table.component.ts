import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.css']
})
export class AgentsTableComponent implements OnInit {

  agents: User[] = []

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAgents()
  }

  private getAgents(): void {
    this.userService.getAllAgents().subscribe((res: User[]) => {
      this.agents = res
    })
  }

  approve(id: number): void {
    this.userService.approveAgent(id).subscribe((res: User) => {
      this.getAgents()
      this.toastr.success('Agent approved')
    }, err => {
      this.toastr.error('Error while approving agent')
    })
  }

  decline(id: number): void {
    this.userService.declineAgent(id).subscribe((res: User) => {
      this.getAgents()
      this.toastr.success('Agent declined')
    }, err => {
      this.toastr.error('Error while declining agent')
    })
  }
}
