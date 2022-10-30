import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usermessages',
  templateUrl: './usermessages.component.html',
  styleUrls: ['./usermessages.component.scss'],
})
export class UsermessagesComponent implements OnInit {
  userMessages: any[] = [];
  userData: any = null;
  constructor(private _UserService: UserService) {}

  ngOnInit(): void {
    this._UserService.getUserData().subscribe({
      next: (data) => {
        this.userData = data.user;
        // console.log(this.userData);
      },
    });
    this._UserService.getUserMessages().subscribe({
      next: (data) => {
        this.userMessages = data.messages;
        // console.log(this.userMessages);
      },
    });
  }

  deleteMessage(id: string): void {
    this._UserService.deleteUserMessage(id).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this._UserService.getUserMessages().subscribe({
            next: (data) => {
              this.userMessages = data.messages;
              // console.log(this.userMessages);
            },
          });
          Swal.fire({
            title: 'Success',
            text: 'Message deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
    });
  }
  shareLink(id: string): void {
    Swal.fire({
      title: 'Copy this link and send it to your friend',
      text: `http://localhost:4200/#/sendmessage/${id}`,
      icon: 'success',
      confirmButtonText: 'OK',
      width: '600px',
    });
  }
}
