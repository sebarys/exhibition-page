import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowkaInvitationComponent } from './sowka-invitation.component';

describe('SowkaInvitationComponent', () => {
  let component: SowkaInvitationComponent;
  let fixture: ComponentFixture<SowkaInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowkaInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowkaInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
