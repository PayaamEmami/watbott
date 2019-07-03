import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Auth } from './../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      if (data.auth === 'false') {
        this.router.navigate(['/'], { replaceUrl: true });
      }
    });
  }

  ngOnInit() {
  }

}
