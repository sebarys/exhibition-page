import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

import { FirebaseDatabaseService } from './firebase-database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationActivationService {

  constructor(private localStorageService: LocalStorageService, private firebaseDatabaseService: FirebaseDatabaseService) { }

  getActivatedLocations(): Observable<Array<string>> {
    return this.firebaseDatabaseService.getLocations()
      .pipe(
        map(locationCodes => {
          return locationCodes.filter(locationCode => this.localStorageService.get(locationCode) === true)
        })
      );
  }

  checkIfLocationAlreadyActivated(locationCode: string): boolean {
    return this.localStorageService.get(locationCode) === true;
  }

  activateLocation(locationCode: string): Observable<boolean> {
    return this.firebaseDatabaseService.checkIfLocationExists(locationCode)
      .pipe(
        map(locationExists => {
          if(locationExists) {
            return this.localStorageService.set(locationCode, true);
          } else {
            return false;
          }
        })
      );
  }

  validateLocationCode(locationCode: string): Observable<boolean> {
    return this.firebaseDatabaseService.checkIfLocationExists(locationCode);
  }
}
