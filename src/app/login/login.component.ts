import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.pattern('^[a-zA-Z0-9@_]{6,30}$'),
      Validators.required,
    ]),
  });
  error: string = '';

  constructor(private _userService: UserService, private _Router: Router) {}

  ngOnInit(): void {}

  register() {
    this.loginForm.markAllAsTouched();
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this._userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            // console.log(response);
            localStorage.setItem('user_token', response.token);
            this._userService.getData();
            this._Router.navigate(['/messages']);
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
