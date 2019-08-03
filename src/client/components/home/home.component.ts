import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, Auth } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe((auth: Auth) => {
      if (auth.isAuthenticated) {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }
}
