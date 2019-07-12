import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {

    return this.authService.getAuth().pipe(map(data => {
      if (data.auth) {
        return true;
      } else {
        this.router.navigate(['/'], { replaceUrl: true });
        return false;
      }
    }));
  }
}
