import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.isAuthenticated = authService.isAuthenticated();

    if (!this.isAuthenticated) {
      this.router.navigateByUrl('http://localhost');
    }
  }

  ngOnInit() {
  }

}
