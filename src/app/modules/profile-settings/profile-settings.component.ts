import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User, UserUpdate } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  user: User
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user

    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      password: ['', Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      phoneNum: [this.user.phoneNum, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      website: [this.user.website, Validators.required],
      biography: [this.user.biography, Validators.required],
      isPublic: [this.user.isPublic, Validators.required]
    })
  }

  submit(): void {
    const payload = new UserUpdate()
    payload.biography = this.form.controls.biography.value
    payload.dateOfBirth = this.form.controls.dateOfBirth.value
    payload.email = this.form.controls.email.value
    payload.name = this.form.controls.name.value
    payload.password = this.form.controls.password.value
    payload.phoneNum = this.form.controls.phoneNum.value
    payload.username = this.form.controls.username.value
    payload.website = this.form.controls.website.value
    payload.isPublic = this.form.controls.isPublic.value

    this.userService.updateProfile(payload).subscribe((res: User) => {
      this.userService.user = res
      this.user = res
      this.toastr.success('Profile successfuly updated')
    }, err => {
      this.toastr.error('Error while updating profile')
    })
  }
}
