import { Component, OnInit } from '@angular/core';
import { AuthService, Auth } from './../../services/auth.service';
import { UserService, User } from './../../services/user.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoutUrl = environment.baseUrl + '/api/user/logout';
  watbottImage = '../../assets/img/logo/watbott_background_icon.png';
  isAuthenticated = false;
  username = '';
  userImage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService) {

    this.authService.getAuth().subscribe((data: Auth) => {
      this.isAuthenticated = data.auth;
    });

    this.userService.getInfo().subscribe((data: User) => {
      this.username = data.username;
      this.userImage = data.userImage;
    });
  }

  ngOnInit() {
  }

}
