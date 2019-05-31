import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  twitterUrl = '';
  githubUrl = '';
  githubPath = '';
  watbottPath = '';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.twitterUrl = 'https://twitter.com/WatBott';
    this.githubUrl = 'https://github.com/PayaamEmami/watbott';
    this.githubPath = '../../assets/img/socials/github_white.png';
    this.watbottPath = '../../assets/img/logo/watbott_background_icon.png';
    iconRegistry.addSvgIcon(
      'twitter-logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitter_white.svg')
    );
   }

  ngOnInit() {
  }

}
