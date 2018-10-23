import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SowkaComponent } from './sowka/sowka.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RaspComponent } from './rasp/rasp.component';
import { RaspActivationComponent } from './rasp-activation/rasp-activation.component';

@NgModule({
  declarations: [
    AppComponent,
    SowkaComponent,
    HomepageComponent,
    RaspComponent,
    RaspActivationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
