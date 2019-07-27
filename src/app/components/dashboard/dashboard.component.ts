import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService, Whitelist } from './../../services/user.service';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isWhitelisted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) {

    this.userService.getWhitelist().subscribe((data: Whitelist) => {
      this.isWhitelisted = data.isWhitelisted;
    });

    if (!this.isWhitelisted) {
      this.openDialog();
    }
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      // TODO: Logout user
    });
  }
}
