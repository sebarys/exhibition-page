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

  pageInitialised: boolean = false;
  alreadyTakingPart: boolean;
  entitledToInvitation: boolean;
  runOutOfInvitations: boolean;

  numberOfFreeInvitations: number;

  date: string = '???';
  time: string = '???';
  location: string = '???';
  apartmentNumber: string = '???';

  constructor(
    private locationActivationService: LocationActivationService,
    private exhibitionDetailsService: ExhibitionDetailsService,
    private invitationService: InvitationService
    ) { }

  ngOnInit() {
    this.invitationService.getCachedNumberOfFreeInvitations()
      .subscribe(numberOfFreeInvitations => {

        if(numberOfFreeInvitations > 0) {
          this.numberOfFreeInvitations = numberOfFreeInvitations;
          this.initialisePageValues();
        } else {
          this.runOutOfInvitations = true;
          this.pageInitialised = true;
        }
      })
  }

  private initialisePageValues() {
    this.locationActivationService.getActivatedLocations()
      .subscribe(activatedLocations => {
        const numberOfAlreadyActivatedLocations = activatedLocations.length;
        this.date = this.exhibitionDetailsService.getDate();
        this.time = this.exhibitionDetailsService.getTime();

        if(numberOfAlreadyActivatedLocations >= 1) {
          this.exhibitionDetailsService.getLocation()
            .subscribe(place => this.location = place);
          this.alreadyTakingPart = true;
        }

        if (numberOfAlreadyActivatedLocations >= 2) {
          this.exhibitionDetailsService.getApartmentNumber()
            .subscribe(apartmentNumber => this.apartmentNumber = apartmentNumber);
          this.entitledToInvitation = true;
        }

        this.pageInitialised = true;
      })
  }

}
