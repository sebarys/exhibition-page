import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SowkaComponent } from './sowka/sowka.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RaspComponent } from './rasp/rasp.component';
import { RaspActivationComponent } from './rasp-activation/rasp-activation.component';
import { InvitationComponent } from './shared/components/invitation/invitation.component';
import { AboutExhibitionComponent } from './about-exhibition/about-exhibition.component';

import config from '../assets/config.json';
import { SowkaPlayComponent } from './sowka-play/sowka-play.component';
import { SowkaPlayIframeComponent, SafePipe } from './sowka-play-iframe/sowka-play-iframe.component';
import { SowkaInvitationComponent } from './sowka-invitation/sowka-invitation.component';

@NgModule({
  declarations: [
    AppComponent,
    SowkaComponent,
    HomepageComponent,
    RaspComponent,
    RaspActivationComponent,
    InvitationComponent,
    AboutExhibitionComponent,
    SowkaPlayComponent,
    SafePipe,
    SowkaPlayIframeComponent,
    SowkaInvitationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config.firebase),
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: config.recaptcha.siteKey } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
