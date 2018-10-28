import { Component, OnInit } from '@angular/core';
import { LocationActivationService } from '../shared/services/location-activation.service';
import { ExhibitionDetailsService } from '../shared/services/exhibition-details.service';

@Component({
  selector: 'app-rasp',
  templateUrl: './rasp.component.html',
  styleUrls: ['./rasp.component.scss']
})
export class RaspComponent implements OnInit {

  alreadyTakingPart: boolean;
  entitledToInvitation: boolean;

  date: string = '???';
  time: string = '???';
  place: string = '???';

  constructor(
    private locationActivationService: LocationActivationService,
    private exhibitionDetailsService: ExhibitionDetailsService
    ) { }

  ngOnInit() {
    const alreadyActivatedLocations = this.locationActivationService.getActivatedLocations();
    const numberOfAlreadyActivatedLocations = alreadyActivatedLocations.length;
    if(numberOfAlreadyActivatedLocations >= 1) {
      this.date = this.exhibitionDetailsService.getDate();
      this.alreadyTakingPart = true;
    }

    if (numberOfAlreadyActivatedLocations >= 2) {
      this.time = this.exhibitionDetailsService.getTime();
    }

    if (numberOfAlreadyActivatedLocations >= 3) {
      this.place = this.exhibitionDetailsService.getPlace();
      this.entitledToInvitation = true;
    }
  }

}
