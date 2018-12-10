import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-sowka-play-iframe',
  templateUrl: './sowka-play-iframe.component.html',
  styleUrls: ['./sowka-play-iframe.component.scss']
})
export class SowkaPlayIframeComponent implements OnInit {

  game: string = "https://igorzych.me/demo/index.html";

  constructor() { }

  ngOnInit() {
  }

}
