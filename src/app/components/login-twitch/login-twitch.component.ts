import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService, Auth } from './../../services/auth.service';
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
    private authService: AuthService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {

    this.authService.getAuth().subscribe((data: Auth) => {
      this.isAuthenticated = data.auth;
    });

    this.iconRegistry.addSvgIcon(
      'twitch-white',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/twitch/white.svg')
    );

    this.iconRegistry.addSvgIcon(
      'twitch-purple',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/twitch/purple.svg')
    );
  }

  ngOnInit() {
  }

}
