import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService, Auth } from '../../services/authentication.service';

@Component({
  selector: 'app-login-twitch',
  templateUrl: './login-twitch.component.html',
  styleUrls: ['./login-twitch.component.css']
})
export class LoginTwitchComponent implements OnInit {
  @Input() icon: string;
  @Input() color: string;
  @Input() text: string;
  loginUrl = 'http://localhost:3000/auth/twitch';
  isAuthenticated = false;

  constructor(
    private authService: AuthenticationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
      'white-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/socials/twitch_white.svg')
    );

    iconRegistry.addSvgIcon(
      'purple-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/socials/twitch_purple.svg')
    );

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      this.isAuthenticated = (data.auth === 'true') ? true : false;
    });
  }

  ngOnInit() {
  }

}
