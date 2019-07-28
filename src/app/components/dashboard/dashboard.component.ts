import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService, User } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: User) => {
      if (!user.isWhitelisted) {
        this.openDialog();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
    });
  }
}
