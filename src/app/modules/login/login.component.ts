import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr'
import { UserLogin, UserRole } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(): void {
    const username = this.form.controls.username.value
    const password = this.form.controls.password.value

    this.userService.login({ username, password }).subscribe((res: UserLogin) => {
      this.userService.loginUser(res)
      if (res.user.role === UserRole.admin) {
        this.router.navigate(['/backoffice'])
      } else {
        this.router.navigate(['/'])
      }
    }, err => {
      this.toastr.error('Login error')
    })
  }
}
