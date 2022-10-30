import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthreversedGuard implements CanActivate {
  constructor(private _Router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('user_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        this._Router.navigate(['/messages']);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
