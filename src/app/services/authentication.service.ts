import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  auth: boolean;

  constructor() { }

  isAuthenticated(): boolean {
    fetch('http://localhost:3000/auth', { credentials: 'include' })
      .then((res) => {
        this.auth = (res.status === 200) ? true : false;
      });

    return this.auth;
  }
}
