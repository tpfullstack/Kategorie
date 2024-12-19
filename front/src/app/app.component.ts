import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
  username = '';

  constructor(public spinnerService: NgxSpinnerService, private authService: AuthService){}
  title = 'Kategory';

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      console.log(this.authService.getToken())
      console.log(this.username)
      this.username = this.authService.getUsername();
      console.log("Username")
      console.log(this.username)
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
