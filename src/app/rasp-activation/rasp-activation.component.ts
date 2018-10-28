import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationActivationService } from '../shared/services/location-activation.service';

@Component({
  selector: 'app-rasp-activation',
  templateUrl: './rasp-activation.component.html',
  styleUrls: ['./rasp-activation.component.scss']
})
export class RaspActivationComponent implements OnInit {

  locationActivationCode: string;
  invalidActivationCode: boolean;
  locationAlreadyActivated: boolean;

  constructor(private activatedRoute: ActivatedRoute, private locationActivationService: LocationActivationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.locationActivationCode = params.id;
      const isActivationCodeValid = this.locationActivationService.validateLocationCode(this.locationActivationCode);
      this.invalidActivationCode = !isActivationCodeValid;
      if(isActivationCodeValid) {
        this.locationAlreadyActivated = this.locationActivationService.checkIfLocationAlreadyActivated(this.locationActivationCode);
      }
    });
  }

  activateLocation() {
    const locationActivatedSuccessfully = this.locationActivationService.activateLocation(this.locationActivationCode)
    console.log(`location activation: ${locationActivatedSuccessfully}`);
    if(locationActivatedSuccessfully) {
      this.locationAlreadyActivated = true
    }
  }

}
