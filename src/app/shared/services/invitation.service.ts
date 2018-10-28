import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import config from '../../../assets/config.json';
import { LocalStorageService } from './local-storage.service.js';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private emailUrl: string = config.emailjs.url;
  private invitationIdKey = 'invitation_id';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  /* send generated invitation to configured email server */
  generateInvitation(firstName: string, secondName: string, captchaResponse: string): Observable<string> {
    const invitationId: string = this.generateHash(firstName, secondName);

    var templateParams = {
      'to_name': 'sebarys',
      'from_name': 'Angular app',
      'message_html': `Integration using EmailJS with gmail email service is working. Generated invitation id: ${invitationId}`,
      'g-recaptcha-response': captchaResponse
    };

    const emailFormBodyEmailjs = {
      'service_id': config.emailjs.service_id,
      'template_id': config.emailjs.template_id,
      'user_id': config.emailjs.user_id,
      'template_params': templateParams
    }
    return this.httpClient.post(this.emailUrl, emailFormBodyEmailjs, this.createDefaultHttpOptions())
      .pipe(
        map<Object, string>(response => invitationId),
        catchError((error: HttpErrorResponse) => this.handleError(error, invitationId)),
        tap(() => {
          this.localStorageService.set(this.invitationIdKey, invitationId);
        })
      );
  }

  getInvitationId(): string {
    return this.localStorageService.get(this.invitationIdKey);
  }

  private generateHash(fistName: string, secondName: string): string {
    return btoa(`${fistName},${secondName}`);
  }

  private handleError(error: HttpErrorResponse, invitationId: string) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('Something bad happened; please try again later.');
    } else if (error.status >= 200 && error.status <= 300) {
      return of(invitationId);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      return throwError('Something bad happened; please try again later.');
    }
  }

  private createDefaultHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      })
    };
  }
}
