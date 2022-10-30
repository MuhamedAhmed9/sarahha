import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.scss'],
})
export class SendmessageComponent implements OnInit {
  userData: any = null;
  messageText: string = '';

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UserService
  ) {}

  ngOnInit(): void {
    // console.log(this._ActivatedRoute.snapshot.params['id']);
    this._UserService
      .getRecieverData(this._ActivatedRoute.snapshot.params['id'])
      .subscribe({
        next: (data) => {
          if (data.message == 'success') {
            this.userData = data?.reciever;
            // console.log(this.userData);
          } else {
            Swal.fire({
              title: 'Error',
              text: 'link is not valid , please check the link',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
      });
  }

  sendMessage(): void {
    this._UserService
      .sendMessage(this.messageText, this.userData._id)
      .subscribe({
        next: (data) => {
          // console.log(data);
          if (data?.message == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Message Sent',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.messageText = '';
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Message Not Sent',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Message Not Sent',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
  }
}
