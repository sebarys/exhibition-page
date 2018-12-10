import { Injectable } from '@angular/core';

import { FirebaseDatabaseService } from './firebase-database.service.js';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionDetailsService {

  private DATE = '7 grudnia 2018';
  private TIME = '20:00:00';
  private LOCATION_IDENTIFIER = '7H2JogEwBzNeocpz4rTx';
  private APARTMENT_FLOOR_IDENTIFIER = 'ZVq4eb60QC6K2K1F8tnm';
  private cachedLocation: string;
  private cachedFloorNumber: string;

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) { }

  getDate(): string {
    return this.DATE;
  }

  getTime(): string {
    return this.TIME;
  }

  getLocation(): Observable<string>  {
    if(this.cachedLocation) {
      return of(this.cachedLocation)
    } else {
      return this.firebaseDatabaseService.getExhibitionInformation(this.LOCATION_IDENTIFIER)
      .pipe(
        tap(location => this.cachedLocation = location)
      );
    }
  }

  getFloor(): Observable<string> {
    if(this.cachedFloorNumber) {
      return of(this.cachedFloorNumber)
    } else {
    return this.firebaseDatabaseService.getExhibitionInformation(this.APARTMENT_FLOOR_IDENTIFIER)
      .pipe(
        tap(floorNumber => this.cachedFloorNumber = floorNumber)
      );
    }
  }
}
