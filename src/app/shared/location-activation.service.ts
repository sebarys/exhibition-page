import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

import config from './../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class LocationActivationService {

  private encodedLocationCodes: Array<string> = config.encodedlocationCodes;

  constructor(private localStorageService: LocalStorageService) { }

  getActivatedLocations(): Array<string> {
    return this.encodedLocationCodes
      .filter(encodedLocationCode => this.localStorageService.get(encodedLocationCode) === true)
      .map(encodedLocationCode => this.decodeLocationCode(encodedLocationCode));
  }

  checkIfLocationAlreadyActivated(locationCode: string): boolean {
    const encodedLocationCode = this.encodeLocationCode(locationCode);
    return this.localStorageService.get(encodedLocationCode) === true;
  }

  activateLocation(locationCode: string): boolean {
    // maybe should be handled different to do not encode locationCode twice
    // but do not want to leak encoding logic elsewhere that this service class
    // change if encoding will be expensive operation
    if(this.validateLocationCode(locationCode)) {
      const encodedLocationCode = this.encodeLocationCode(locationCode);
      return this.localStorageService.set(encodedLocationCode, true);
    } else {
      return false;
    }
  }

  validateLocationCode(locationCode: string): boolean {
    return this.encodedLocationCodes.includes(this.encodeLocationCode(locationCode));
  }

  private encodeLocationCode(locationCode: string): string {
    return locationCode;
  }

  private decodeLocationCode(locationCode: string): string {
    return locationCode;
  }
}
