import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowkaPlayComponent } from './sowka-play.component';

describe('SowkaPlayComponent', () => {
  let component: SowkaPlayComponent;
  let fixture: ComponentFixture<SowkaPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowkaPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowkaPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
