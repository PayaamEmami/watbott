import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Auth } from './../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router) {

    this.authService.isAuthenticated().subscribe((data: Auth) => {
      if (data.auth === 'true') {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }

  ngOnInit() {
  }

}
