import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Auth } from './../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router) {

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      this.isAuthenticated = (data.auth === 'true') ? true : false;

      if (!this.isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
  }

}
