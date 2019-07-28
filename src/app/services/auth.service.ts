import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Auth {
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    this.getAuth().subscribe((auth: Auth) => {
      this.isAuthenticated = auth.isAuthenticated;
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAuth(): Observable<any> {
    return this.http.get<Auth>('/auth',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    this.http.put('/auth/logout', { observe: 'response' })
      .subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
  }
}
