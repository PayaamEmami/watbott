import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.css']
})
export class SocialsComponent implements OnInit {
  @Input() showText: boolean;
  twitterUrl = 'https://twitter.com/WatBott';
  githubUrl = 'https://github.com/PayaamEmami/watbott';
  githubImage = '../../assets/img/socials/github_white.png';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'twitter-logo',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/socials/twitter_white.svg')
    );
  }

  ngOnInit() {
  }

}
