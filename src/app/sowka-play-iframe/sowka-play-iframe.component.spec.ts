import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowkaPlayIframeComponent } from './sowka-play-iframe.component';

describe('SowkaPlayIframeComponent', () => {
  let component: SowkaPlayIframeComponent;
  let fixture: ComponentFixture<SowkaPlayIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowkaPlayIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowkaPlayIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
