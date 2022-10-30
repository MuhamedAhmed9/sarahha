import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any = new BehaviorSubject(null);
  token: any = '';

  constructor(private _httpClient: HttpClient) {
    this.getData();
  }

  getData(): void {
    this.token = localStorage.getItem('user_token');
    if (this.token) {
      this.userData.next(jwtDecode(this.token));
    }
  }

  registerUser(user: any): Observable<any> {
    return this._httpClient.post(
      'https://sarahha.herokuapp.com/api/v1/auth/signup',
      user
    );
  }

  loginUser(user: any): Observable<any> {
    return this._httpClient.post(
      'https://sarahha.herokuapp.com/api/v1/auth/signin',
      user
    );
  }

  logOut(): void {
    localStorage.removeItem('user_token');
    this.userData.next(null);
  }

  getUserData(): Observable<any> {
    const headObj = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return this._httpClient.get(
      'https://sarahha.herokuapp.com/api/v1/user/userinfo',
      headObj
    );
  }

  getUserMessages(): Observable<any> {
    const headObj = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return this._httpClient.get(
      'https://sarahha.herokuapp.com/api/v1/user/messages',
      headObj
    );
  }

  deleteUserMessage(id: string): Observable<any> {
    const headObj = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return this._httpClient.delete(
      `https://sarahha.herokuapp.com/api/v1/message/deleteMessage/${id}`,
      headObj
    );
  }

  sendMessage(message: string, recieverId: string): Observable<any> {
    return this._httpClient.post(
      `https://sarahha.herokuapp.com/api/v1/message/addMessage/${recieverId}`,
      { message }
    );
  }

  getRecieverData(id: string): Observable<any> {
    return this._httpClient.get(
      `https://sarahha.herokuapp.com/api/v1/user/recieverinfo/${id}`
    );
  }
}
