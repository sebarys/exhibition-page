import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

import config from '../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class LocationActivationService {

  private encodedLocationCodes: Array<string> = config.encodedLocationCodes;

  constructor(private localStorageService: LocalStorageService) { }

  getActivatedLocations(): Array<string> {
    return this.encodedLocationCodes
      .filter(encodedLocationCode => this.localStorageService.get(encodedLocationCode) === true)
      .map(encodedLocationCode => this.decodeLocationCode(encodedLocationCode));
  }

  checkIfLocationAlreadyActivated(locationCode: string): boolean {
    return this.localStorageService.get(locationCode) === true;
  }

  activateLocation(locationCode: string): boolean {
    // Maybe should be handled different to do not encode locationCode twice
    // but do not want to leak encoding logic elsewhere that this service class.
    // Change if encoding will be expensive operation.
    if(this.validateLocationCode(locationCode)) {
      return this.localStorageService.set(locationCode, true);
    } else {
      return false;
    }
  }

  validateLocationCode(locationCode: string): boolean {
    return this.encodedLocationCodes.includes(locationCode);
  }

  private encodeLocationCode(locationCode: string): string {
    return btoa(locationCode);
  }

  private decodeLocationCode(encodedLocationCode: string): string {
    return atob(encodedLocationCode);
  }
}
