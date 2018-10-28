import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../services/invitation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  alreadyInvited: boolean;

  invitationForm: FormGroup;
  captchaResponse: string;
  formSubmitted = false;

  invitationId: string;

  constructor(private invitationService: InvitationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const maybeInvitationId = this.invitationService.getInvitationId();
    if(maybeInvitationId) {
      this.alreadyInvited = true;
      this.invitationId = maybeInvitationId;
    }

    this.invitationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    if (this.invitationForm.invalid) {
        return;
    }

    this.invitationService
      .generateInvitation(this.invitationForm.get('firstName').value, this.invitationForm.get('lastName').value, this.captchaResponse)
      .subscribe(
        (invitationId) => {
          this.invitationId = invitationId;
          this.alreadyInvited = true;
        },
        errorMsg => alert(errorMsg)
      );
  }

}
