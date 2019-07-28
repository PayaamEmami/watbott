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
  isInChannel = false;

  constructor(private http: HttpClient) {
    this.getBot().subscribe((bot: Bot) => {
      this.isInChannel = bot.isInChannel;
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

  getBot(): Observable<any> {
    return this.http.get<Bot>('/api/bot',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  joinChannel(): void {
    this.http.put('/api/bot/join', { observe: 'response' })
      .subscribe(() => {
        this.isInChannel = true;
      });
  }

  partChannel(): void {
    this.http.put('/api/bot/part', { observe: 'response' })
      .subscribe(() => {
        this.isInChannel = false;
      });
  }
}
