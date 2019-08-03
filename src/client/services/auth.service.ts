import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';

export interface Auth {
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getAuth(): Observable<any> {
    return this.http.get<Auth>('/auth',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    return this.http.put('/auth/logout', { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
}
