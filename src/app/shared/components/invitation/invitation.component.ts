import { Component, OnInit, Input } from '@angular/core';
import { InvitationService } from '../../services/invitation.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ExhibitionDetailsService } from '../../services/exhibition-details.service';

@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  @Input() entitledToInvitation = false;

  pageInitialised: boolean = false;
  generatingInvitationInProgress: boolean = false;
  alreadyInvited: boolean;

  date: string = '???';
  time: string = '???';
  location: string = '???';
  floorNumber: string = '???';

  invitationForm: FormGroup;
  captchaResponse: string;
  formSubmitted = false;

  invitationId: string;

  numberOfFreeInvitations: number;

  constructor(
    private invitationService: InvitationService,
    private exhibitionDetailsService: ExhibitionDetailsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const maybeInvitationId = this.invitationService.getInvitationId();
    if(maybeInvitationId) {
      console.log(`Invitation id: ${maybeInvitationId}`);
      this.alreadyInvited = true;
      this.invitationId = maybeInvitationId;
      this.pageInitialised = true;
      this.fetchExhibitonDetails()
    } else {
      this.invitationService.getCachedNumberOfFreeInvitations()
        .subscribe(numberOfFreeInvitations => {
          this.numberOfFreeInvitations = numberOfFreeInvitations;
          this.pageInitialised = true;
        })
    }

    this.invitationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[A-Za-z][A-Za-z ]+$')]],
      recaptcha: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.invitationForm.controls; }

  captchaResolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaResponse = captchaResponse;
  }

  generateInvitation() {
    this.formSubmitted = true;
    // stop here if form is invalid
    if (this.invitationForm.invalid || !this.pageInitialised) {

      console.log(`Is form valid: ${this.invitationForm.invalid}, is page initialised: ${this.pageInitialised}`);
      Object.keys(this.invitationForm.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.invitationForm.get(key).errors;
        if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Form validation error. Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
      });

      return;
    }

    //I think that form should disapear during generating invitation.
    this.generatingInvitationInProgress = true;
    this.invitationService
      .generateInvitation(
        this.invitationForm.get('firstName').value,
        this.generateRandomCode(),
        this.captchaResponse
      )
      .subscribe(
        (invitationId) => {
          this.invitationId = invitationId;
          this.alreadyInvited = true;
          this.generatingInvitationInProgress = false;
          location.reload();
        },
        errorMsg => alert(errorMsg)
      );
  }

  private generateRandomCode() {
    return Math.random().toString(36).substring(7);
  }

  private fetchExhibitonDetails() {
    this.date = this.exhibitionDetailsService.getDate();
    this.time = this.exhibitionDetailsService.getTime();
    this.exhibitionDetailsService.getLocation()
      .subscribe(place => this.location = place);
    this.exhibitionDetailsService.getFloor()
      .subscribe(floor => this.floorNumber = floor);
  }

}
