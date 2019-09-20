import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomePromoComponent } from './home-promo/home-promo.component';
import { AuthService } from 'src/client/services/auth.service';
import { asyncData } from 'src/test/async-observable-helpers';

@Component({ selector: 'app-login-twitch', template: '' })
class LoginTwitchComponent { }

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: { getAuth: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuth']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HomeHeaderComponent,
        HomePromoComponent,
        LoginTwitchComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should call redirect to dashboard once if user is authenticated', () => {
    authServiceSpy.getAuth.and.returnValue(asyncData({ isAuthenticated: true }));
    routerSpy.navigate.and.stub();

    component.ngOnInit();

    expect(routerSpy.navigate.calls.count()).toBe(1, 'one call to redirect page');
  });
});
