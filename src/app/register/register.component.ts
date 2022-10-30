import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.pattern('^[a-zA-Z0-9@_]{6,30}$'),
      Validators.required,
    ]),
    cPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [
      Validators.required,
      Validators.pattern('^(Male|Female)$'),
    ]),
    profilePic: new FormControl('', [
      Validators.required,
      Validators.pattern('^(http|https)://.*$'),
    ]),
  });
  error: string = '';

  constructor(private _userService: UserService, private _Router: Router) {}

  ngOnInit(): void {}

  register() {
    this.registerForm.markAllAsTouched();
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this._userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            Swal.fire(
              'Email was Created Successfully!',
              `Please Check your inbox (${
                this.registerForm.get('email')?.value
              }) to confirm email!`,
              'success'
            );
            setTimeout(() => {
              this._Router.navigate(['/login']);
            }, 4000);
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
