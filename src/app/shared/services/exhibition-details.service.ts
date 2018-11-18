import { Injectable } from '@angular/core';

import { FirebaseDatabaseService } from './firebase-database.service.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionDetailsService {

  private DATE = '01.12.2019';
  private TIME = '23:59:00';
  private LOCATION_IDENTIFIER = '7H2JogEwBzNeocpz4rTx';
  private APARTMENT_NUMBER_IDENTIFIER = 'ZVq4eb60QC6K2K1F8tnm';

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) { }

  getDate(): string {
    return this.DATE;
  }

  getTime(): string {
    return this.TIME;
  }

  getLocation(): Observable<string>  {
    return this.firebaseDatabaseService.getExhibitionInformation(this.LOCATION_IDENTIFIER);
  }

  getApartmentNumber(): Observable<string> {
    return this.firebaseDatabaseService.getExhibitionInformation(this.APARTMENT_NUMBER_IDENTIFIER);
  }
}
