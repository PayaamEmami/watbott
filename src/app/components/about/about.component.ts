import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  githubUrl = '';

  constructor() {
    this.githubUrl = 'https://github.com/PayaamEmami/watbott';
  }

  ngOnInit() {
  }

}
