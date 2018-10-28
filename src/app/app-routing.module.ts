import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from "./homepage/homepage.component";
import { RaspComponent } from "./rasp/rasp.component";
import { RaspActivationComponent } from "./rasp-activation/rasp-activation.component";
import { SowkaComponent } from "./sowka/sowka.component";
import { AboutExhibitionComponent } from './about-exhibition/about-exhibition.component';

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
    path: 'rasp/activation/:id',
    component: RaspActivationComponent
  },
  {
    path: 'sowka',
    component: SowkaComponent
  },
  {
    path: 'about',
    component: AboutExhibitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
