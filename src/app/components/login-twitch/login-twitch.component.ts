import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService, Auth } from './../../services/authentication.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login-twitch',
  templateUrl: './login-twitch.component.html',
  styleUrls: ['./login-twitch.component.css']
})
export class LoginTwitchComponent implements OnInit {
  @Input() icon: string;
  @Input() color: string;
  @Input() text: string;
  loginUrl = environment.baseUrl + '/auth/twitch';
  isAuthenticated = false;

  constructor(
    private authService: AuthenticationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {

    this.iconRegistry.addSvgIcon(
      'white-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/socials/twitch_white.svg')
    );

    this.iconRegistry.addSvgIcon(
      'purple-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/socials/twitch_purple.svg')
    );

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      this.isAuthenticated = (data.auth === 'true') ? true : false;
    });
  }

  ngOnInit() {
  }

}
