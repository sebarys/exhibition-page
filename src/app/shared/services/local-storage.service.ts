import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  set(key: string, data: any): boolean {
    let resultOfSetting: boolean = false;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      resultOfSetting = true;
    } catch (e) {
      console.error('Error saving to localStorage', e);
      resultOfSetting = false;
    }
    return resultOfSetting;
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
