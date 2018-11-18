import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../services/invitation.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  pageInitialised: boolean = false;
  generatingInvitationInProgress: boolean = false;
  alreadyInvited: boolean;

  invitationForm: FormGroup;
  captchaResponse: string;
  formSubmitted = false;

  invitationId: string;

  numberOfFreeInvitations: number;

  constructor(private invitationService: InvitationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const maybeInvitationId = this.invitationService.getInvitationId();
    if(maybeInvitationId) {
      console.log(`Invitation id: ${maybeInvitationId}`);
      this.alreadyInvited = true;
      this.invitationId = maybeInvitationId;
      this.pageInitialised = true;
    } else {
      this.invitationService.getCachedNumberOfFreeInvitations()
        .subscribe(numberOfFreeInvitations => {
          this.numberOfFreeInvitations = numberOfFreeInvitations;
          this.pageInitialised = true;
        })
    }

    this.invitationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
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
        },
        errorMsg => alert(errorMsg)
      );
  }

  private generateRandomCode() {
    return Math.random().toString(36).substring(7);
  }

}
