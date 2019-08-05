import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.css']
})
export class SocialsComponent implements OnInit {
  @Input() showText: boolean;
  twitterUrl = environment.twitterUrl;
  githubUrl = environment.githubUrl;
  githubImage = '../../assets/img/socials/github_white.png';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.iconRegistry.addSvgIcon(
      'twitter-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitter_white.svg')
    );
  }

}
