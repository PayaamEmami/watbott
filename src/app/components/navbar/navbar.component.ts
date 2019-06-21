import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService, Auth } from '../../services/authentication.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  twitterUrl = 'https://twitter.com/WatBott';
  githubUrl = 'https://github.com/PayaamEmami/watbott';
  logoutUrl = 'http://localhost:3000/user/logout';
  githubImage = '../../assets/img/socials/github_white.png';
  watbottImage = '../../assets/img/logo/watbott_background_icon.png';
  isAuthenticated = false;
  username = '';
  userImage = '';

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'twitter-logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitter_white.svg')
    );

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      this.isAuthenticated = (data.auth === 'true') ? true : false;
    });

    this.userService.getInfo().subscribe((data: User) => {
      this.username = data.username;
      this.userImage = data.userImage;
    });
  }

  ngOnInit() {
  }

}
