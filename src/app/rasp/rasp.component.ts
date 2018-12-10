import { Component, OnInit } from '@angular/core';
import { LocationActivationService } from '../shared/services/location-activation.service';
import { ExhibitionDetailsService } from '../shared/services/exhibition-details.service';
import { InvitationService } from '../shared/services/invitation.service';

@Component({
  selector: 'app-rasp',
  templateUrl: './rasp.component.html',
  styleUrls: ['./rasp.component.scss']
})
export class RaspComponent implements OnInit {

  alreadyTakingPart: boolean;
  alreadyInvited: boolean;
  entitledToInvitation: boolean;
  runOutOfInvitations: boolean;

  numberOfFreeInvitations: number;

  date: string = '???';
  time: string = '???';
  location: string = '???';
  floorNumber: string = '???';

  constructor(
    private locationActivationService: LocationActivationService,
    private invitationService: InvitationService,
    private exhibitionDetailsService: ExhibitionDetailsService
    ) { }

  ngOnInit() {
    this.initialisePageValues();
  }

  private initialisePageValues() {
    this.locationActivationService.getActivatedLocations()
      .subscribe(activatedLocations => {
        if(this.invitationService.getInvitationId()) {
          this.alreadyInvited = true;
        } else {
          this.alreadyInvited = false;
        }
        const numberOfAlreadyActivatedLocations = activatedLocations.length;
        this.date = this.exhibitionDetailsService.getDate();
        this.time = this.exhibitionDetailsService.getTime();

        if(numberOfAlreadyActivatedLocations >= 1) {
          this.exhibitionDetailsService.getLocation()
            .subscribe(place => this.location = place);
          this.alreadyTakingPart = true;
        }

        if (numberOfAlreadyActivatedLocations >= 2) {
          this.exhibitionDetailsService.getFloor()
            .subscribe(floor => this.floorNumber = floor);
          this.entitledToInvitation = true;
        }
      })
  }

}
