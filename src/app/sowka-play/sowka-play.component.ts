import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare var start: any;

@Component({
  selector: 'app-sowka-play',
  templateUrl: './sowka-play.component.html',
  styleUrls: ['./sowka-play.component.scss']
})
export class SowkaPlayComponent implements OnInit, OnDestroy  {

  constructor(
    // private router: Router
    ) { }

  ngOnInit() {
    console.log('Trying to start pacman');
    new start();
  }

  ngOnDestroy(): void {
    location.reload();
  }

}
