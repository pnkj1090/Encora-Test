import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URLS, User } from 'src/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private httpClient: HttpClient,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (!!localStorage.isLoggedin) {
      this.router.navigate(["/home"])
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  loginUser(formData: FormGroup): void {
    this.httpClient.get<Array<User>>(URLS.getUsers).subscribe((userData) => {
      for (let user of userData) {
        if (formData.value.email === user.email) {
          localStorage.isLoggedin = true;
          localStorage.userDetails = JSON.stringify(user);
          this.router.navigate(["/home"]);
          return;
        }
      }
      this.toaster.error('User not found', 'Invalid Credentials')
    })
  }

}
