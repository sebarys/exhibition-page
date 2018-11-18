import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import config from '../../../assets/config.json';
import { LocalStorageService } from './local-storage.service.js';
import { FirebaseDatabaseService } from './firebase-database.service.js';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private EMAIL_URL: string = config.emailjs.url;
  private INVITATION_ID_KEY = 'invitation_id';
  private MAX_NUMBER_OF_INVITATIONS: number = 50;

  private cachedNumberOfFreeInvitations;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private firebaseDatabaseService: FirebaseDatabaseService) { }

  /* send generated invitation to configured email server */
  generateInvitation(firstName: string, code: string, captchaResponse: string): Observable<string> {
    const invitationId: string = this.generateHash(firstName, code);

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
    return this.httpClient.post(this.EMAIL_URL, emailFormBodyEmailjs, this.createDefaultHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error, invitationId)),
        mergeMap<Object, string>(response => this.firebaseDatabaseService.insertInvitation(invitationId)),
        tap(() => {
          this.localStorageService.set(this.INVITATION_ID_KEY, invitationId);
        })
      );
  }

  getInvitationId(): string {
    return this.localStorageService.get(this.INVITATION_ID_KEY);
  }

  getNumberOfFreeInvitations(): Observable<number> {
    return this.firebaseDatabaseService.getNumberOfInvitations()
      .pipe(
        map<number, number>(numberOfInvitations => this.MAX_NUMBER_OF_INVITATIONS - numberOfInvitations),
        tap(numberOfFreeInvitations => this.cachedNumberOfFreeInvitations = numberOfFreeInvitations)
      );
  }

  getCachedNumberOfFreeInvitations(): Observable<number> {
    if(this.cachedNumberOfFreeInvitations) {
      console.log(`Cached nr of invitations: ${this.cachedNumberOfFreeInvitations}`)
      return of(this.cachedNumberOfFreeInvitations)
    } else {
      console.log(`No cached nr of invitations, checking...`)
      return this.getNumberOfFreeInvitations();
    }
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
        'Content-Type': 'application/json'
      })
    };
  }
}
