import { Component, OnInit } from '@angular/core';

import { InvitationService } from '../shared/services/invitation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sowka',
  templateUrl: './sowka.component.html',
  styleUrls: ['./sowka.component.scss']
})
export class SowkaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  play() {
    this.router.navigate(['/sowka-play']);
  }

}
