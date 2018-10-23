import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocationActivationService } from '../shared/location-activation.service';
import { InvitationService } from '../shared/invitation.service';

@Component({
  selector: 'app-rasp',
  templateUrl: './rasp.component.html',
  styleUrls: ['./rasp.component.scss']
})
export class RaspComponent implements OnInit {

  alreadyTakingPart: boolean;
  alreadyInvited: boolean;
  entitledToInvitation: boolean;

  date: string = 'false';
  time: string = 'false';
  place: string = 'false';

  invitationForm: FormGroup;
  formSubmitted = false;

  invitationId: string;

  constructor(
    private locationActivationService: LocationActivationService,
    private invitationService: InvitationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const alreadyActivatedLocations = this.locationActivationService.getActivatedLocations();
    const numberOfAlreadyActivatedLocations = alreadyActivatedLocations.length;
    if(numberOfAlreadyActivatedLocations >= 1) {
      this.date = 'true';
      this.alreadyTakingPart = true;
    }

    if (numberOfAlreadyActivatedLocations >= 2) {
      this.time = 'true';
    }

    if (numberOfAlreadyActivatedLocations >= 3) {
      this.place = 'true';
      this.entitledToInvitation = true;
    }

    const maybeInvitationId = this.invitationService.getInvitationId();
    if(maybeInvitationId) {
      this.alreadyInvited = true;
      this.invitationId = maybeInvitationId;
    }

    this.invitationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.invitationForm.controls; }

  generateInvitation() {
    this.formSubmitted = true;
    // stop here if form is invalid
    if (this.invitationForm.invalid) {
        return;
    }

    this.invitationService.generateInvitation('firstTestName', 'secondTestName')
      .subscribe(
        (invitationId) => {
          this.invitationId = invitationId;
          //already invited need to be stored in localStorage
          this.alreadyInvited = true;
        },
        errorMsg => alert(errorMsg)
      );
  }

}
