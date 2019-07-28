import { Component, OnInit } from '@angular/core';
import { AuthService, Auth } from './../../services/auth.service';
import { UserService, User } from './../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  watbottImage = '../../assets/img/logo/watbott_background_icon.png';
  login = '';
  profileImage = '';
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe((auth: Auth) => {
      this.isAuthenticated = auth.isAuthenticated;
    });

    this.userService.getUser().subscribe((user: User) => {
      this.login = user.login;
      this.profileImage = user.profileImage;
    });
  }

  logout() {
    this.authService.logout();
  }
}
