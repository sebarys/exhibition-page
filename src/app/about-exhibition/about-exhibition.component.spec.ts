import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExhibitionComponent } from './about-exhibition.component';

describe('AboutExhibitionComponent', () => {
  let component: AboutExhibitionComponent;
  let fixture: ComponentFixture<AboutExhibitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutExhibitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
