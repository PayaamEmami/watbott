import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePromoComponent } from './home-promo.component';

describe('HomePromoComponent', () => {
  let component: HomePromoComponent;
  let fixture: ComponentFixture<HomePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
