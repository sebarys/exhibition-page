import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowkaComponent } from './sowka.component';

describe('SowkaComponent', () => {
  let component: SowkaComponent;
  let fixture: ComponentFixture<SowkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
