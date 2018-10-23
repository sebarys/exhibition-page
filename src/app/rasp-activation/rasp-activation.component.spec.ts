import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspActivationComponent } from './rasp-activation.component';

describe('RaspActivationComponent', () => {
  let component: RaspActivationComponent;
  let fixture: ComponentFixture<RaspActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaspActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
