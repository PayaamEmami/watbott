import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-login-twitch',
  templateUrl: './login-twitch.component.html',
  styleUrls: ['./login-twitch.component.css']
})
export class LoginTwitchComponent implements OnInit {
  loginUrl: string;
  @Input() icon: string;
  @Input() color: string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.loginUrl = 'http://localhost:3000/auth/twitch';
    iconRegistry.addSvgIcon(
      'twitch-logo-white',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitch_white.svg')
    );
    iconRegistry.addSvgIcon(
      'twitch-logo-purple',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitch_purple.svg')
    );
  }

  ngOnInit() {
  }

}
