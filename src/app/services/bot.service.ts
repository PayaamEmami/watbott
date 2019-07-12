import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Bot {
  isInChannel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BotService {
  isConnected = false;

  constructor(private http: HttpClient) {
    this.isInChannel().subscribe((data: Bot) => {
      this.isConnected = data.isInChannel;
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

  isInChannel(): Observable<any> {
    return this.http.get<Bot>('/api/bot/isInChannel',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }
}
