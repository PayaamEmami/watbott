import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  auth: boolean;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/auth', { observe: 'response', withCredentials: true })
      .subscribe((res) => {
        this.auth = (res.status === 200) ? true : false;
      });
  }
}
