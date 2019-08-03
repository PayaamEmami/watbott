import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';

export interface User {
  login: string;
  profileImage: string;
  isWhitelisted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getUser(): Observable<any> {
    return this.http.get<User>('/api/user',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }
}
