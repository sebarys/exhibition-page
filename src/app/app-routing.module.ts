import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from "./homepage/homepage.component";
import { RaspComponent } from "./rasp/rasp.component";
import { RaspActivationComponent } from "./rasp-activation/rasp-activation.component";
import { SowkaComponent } from "./sowka/sowka.component";
import { AboutExhibitionComponent } from './about-exhibition/about-exhibition.component';
import { SowkaPlayComponent } from './sowka-play/sowka-play.component';
import { SowkaPlayIframeComponent } from './sowka-play-iframe/sowka-play-iframe.component';
import { SowkaInvitationComponent } from './sowka-invitation/sowka-invitation.component';

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
    pathMatch: "full"
  },
  {
    path: "rasp",
    component: RaspComponent,
  },
  {
    path: 'rasp/activations/:id',
    component: RaspActivationComponent
  },
  {
    path: 'sowka',
    component: SowkaComponent
  },
  {
    path: 'sowka-play',
    component: SowkaPlayComponent
  },
  {
    path: 'sowka/invitations',
    component: SowkaInvitationComponent
  },
  {
    path: 'sowka-play-iframe',
    component: SowkaPlayIframeComponent
  },
  {
    path: 'about',
    component: AboutExhibitionComponent
  },
  {
    path: "**",
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
