import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _userService: UserService, private _Router: Router) {}
  isLogin: boolean = false;
  ngOnInit(): void {
    this._userService.userData.subscribe({
      next: () => {
        if (this._userService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  logout(): void {
    this._userService.logOut();
    this._Router.navigate(['/login']);
  }
}
