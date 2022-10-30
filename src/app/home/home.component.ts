import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _Router: Router) {}

  ngOnInit(): void {}

  navigateToLogin(): void {
    this._Router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this._Router.navigate(['/register']);
  }
}
