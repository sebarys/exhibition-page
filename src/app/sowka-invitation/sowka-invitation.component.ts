import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-sowka-invitation',
  templateUrl: './sowka-invitation.component.html',
  styleUrls: ['./sowka-invitation.component.scss']
})
export class SowkaInvitationComponent implements OnInit {

  private GAME_FINISHED_KEY = 'Z2FtZS1maW5pc2hlZA==';

  entitledToInvitation: boolean;
  numberOfFreeInvitations: number;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    if(this.localStorageService.get(this.GAME_FINISHED_KEY) === true) {
      this.entitledToInvitation = true;
    } else {
      this.entitledToInvitation = false;
    }
  }

}
