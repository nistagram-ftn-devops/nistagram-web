import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Campaign } from 'src/app/shared/models/campaign.models'
import { Media } from 'src/app/shared/models/media.models'
import { CampaignService } from 'src/app/shared/services/campaign.service'
import { MediaService } from 'src/app/shared/services/media.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  file: any = null
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private campaignService: CampaignService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      website: ['', Validators.required],
      exposureDate: ['', Validators.required],
    })
  }

  onFileChanged(event): void {
    this.file = event.target.files[0]
  }

  submit(): void {
    const website = this.form.controls.website.value
    const exposureDate = this.form.controls.exposureDate.value

    console.log(website)
    console.log(exposureDate)

    if (!this.file) {
      this.toastr.warning('You must upload an image')
      return
    }

    this.mediaService.uploadImage(this.file).subscribe((res: Media) => {
      const campaign = new Campaign()
      
      campaign.authorId = this.userService.user.id
      campaign.imageId = +res.Id
      campaign.website = website
      campaign.exposureDate = exposureDate

      this.campaignService.create(campaign).subscribe((res: Campaign) => {
        this.toastr.success('Campaign successfully created')
        this.router.navigate(['/campaigns'])
      })
    })
  }

}
