import { Injectable } from '@angular/core';

import config from '../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionDetailsService {

  constructor() { }

  getDate(): string {
    return this.decode(config.exhibition.date);
  }

  getTime(): string {
    return this.decode(config.exhibition.time);
  }

  getPlace(): string {
    return this.decode(config.exhibition.place);
  }

  private decode(value: string): string {
    return atob(value);
  }
}
