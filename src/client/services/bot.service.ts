import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';

export interface Bot {
  isInChannel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BotService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getBot(): Observable<any> {
    return this.http.get<Bot>('/api/bot',
      { withCredentials: true, responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  joinChannel(): Observable<any> {
    return this.http.put('/api/bot/join', { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  partChannel(): Observable<any> {
    return this.http.put('/api/bot/part', { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
}
