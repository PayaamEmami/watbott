import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService, Auth } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  twitterUrl = 'https://twitter.com/WatBott';
  githubUrl = 'https://github.com/PayaamEmami/watbott';
  logoutUrl = 'http://localhost:3000/logout';
  githubPath = '../../assets/img/socials/github_white.png';
  watbottPath = '../../assets/img/logo/watbott_background_icon.png';
  isAuthenticated: boolean;

  constructor(private authService: AuthenticationService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'twitter-logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitter_white.svg')
    );

    this.isAuthenticated = false;

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      this.isAuthenticated = (data.auth === 'true') ? true : false;
    });
  }

  ngOnInit() {
  }

}
