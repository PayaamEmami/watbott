import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService, Auth } from './../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {

    return this.authService.getAuth().pipe(map(data => {
      if (data.auth === 'true') {
        return true;
      } else {
        this.router.navigate(['/'], { replaceUrl: true });
        return false;
      }
    }));
  }
}
