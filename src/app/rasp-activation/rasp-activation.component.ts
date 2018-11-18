import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationActivationService } from '../shared/services/location-activation.service';

@Component({
  selector: 'app-rasp-activation',
  templateUrl: './rasp-activation.component.html',
  styleUrls: ['./rasp-activation.component.scss']
})
export class RaspActivationComponent implements OnInit {

  pageInitialised: boolean = false;

  locationActivationCode: string;
  invalidActivationCode: boolean;
  locationAlreadyActivated: boolean;

  constructor(private activatedRoute: ActivatedRoute, private locationActivationService: LocationActivationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.locationActivationCode = params.id;
      this.locationActivationService.validateLocationCode(this.locationActivationCode)
        .subscribe(isActivationCodeValid => {
          this.invalidActivationCode = !isActivationCodeValid;
          if(isActivationCodeValid) {
            this.locationAlreadyActivated = this.locationActivationService.checkIfLocationAlreadyActivated(this.locationActivationCode);
          }
          this.pageInitialised = true;
        })
    });
  }

  activateLocation() {
    this.locationActivationService.activateLocation(this.locationActivationCode)
      .subscribe(isLocationActivatedSuccessfully => {
        const locationActivatedSuccessfully = isLocationActivatedSuccessfully;
        console.log(`location activation result: ${locationActivatedSuccessfully}`);
        if(locationActivatedSuccessfully) {
          this.locationAlreadyActivated = true
        }
      })
  }

}
