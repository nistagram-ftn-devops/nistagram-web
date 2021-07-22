import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserRegistration } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNum: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      biography: ['', Validators.required],
      website: ['', Validators.required],
      isAgent: [false, null],
    })
  }

  submit(): void {
    const payload = new UserRegistration()
    payload.biography = this.form.controls.biography.value
    payload.dateOfBirth = this.form.controls.dateOfBirth.value
    payload.email = this.form.controls.email.value
    payload.isAgent = this.form.controls.isAgent.value
    payload.name = this.form.controls.name.value
    payload.password = this.form.controls.password.value
    payload.phoneNum = this.form.controls.phoneNum.value
    payload.username = this.form.controls.username.value
    payload.website = this.form.controls.website.value

    this.userService.register(payload).subscribe((res: User) => {
      this.toastr.success('Registration successful')
      this.router.navigate(['/login'])
    }, err => {
      this.toastr.error('Error while registering new account')
    })
  }
}
