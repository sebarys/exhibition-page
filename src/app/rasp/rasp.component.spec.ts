import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspComponent } from './rasp.component';

describe('RaspComponent', () => {
  let component: RaspComponent;
  let fixture: ComponentFixture<RaspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
