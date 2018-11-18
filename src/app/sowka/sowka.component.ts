import { Component, OnInit } from '@angular/core';

import { InvitationService } from '../shared/services/invitation.service';

@Component({
  selector: 'app-sowka',
  templateUrl: './sowka.component.html',
  styleUrls: ['./sowka.component.scss']
})
export class SowkaComponent implements OnInit {
  pageInitialised: boolean = false;
  numberOfFreeInvitations: number;
  runOutOfInvitations: boolean;

  constructor(private invitationService: InvitationService) { }

  ngOnInit() {
    this.invitationService.getCachedNumberOfFreeInvitations()
      .subscribe(numberOfFreeInvitations => {

        if(numberOfFreeInvitations > 0) {
          this.numberOfFreeInvitations = numberOfFreeInvitations;
        } else {
          this.runOutOfInvitations = true;
        }
        this.pageInitialised = true;
      })
  }

  start() {

  }

}
