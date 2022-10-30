import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsermessagesComponent } from './usermessages/usermessages.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { AuthreversedGuard } from './authreversed.guard';
import { SendmessageComponent } from './sendmessage/sendmessage.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthreversedGuard], component: HomeComponent },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    component: UsermessagesComponent,
  },
  { path: 'contact', component: ContactComponent },
  {
    path: 'login',
    canActivate: [AuthreversedGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [AuthreversedGuard],
    component: RegisterComponent,
  },
  {
    path: 'sendmessage/:id',
    component: SendmessageComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
