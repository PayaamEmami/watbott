import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { UserService } from 'src/client/services/user.service';
import { AuthService } from 'src/client/services/auth.service';

@Component({ selector: 'app-page-header', template: '' })
class PageHeaderComponent { }

@Component({ selector: 'app-dashboard-content', template: '' })
class DashboardContentComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userServiceSpy: { getUser: jasmine.Spy };
  let authServiceSpy: { getAuth: jasmine.Spy, logout: jasmine.Spy };
  let dialogSpy: { open: jasmine.Spy };

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuth', 'logout']);
    dialogSpy = jasmine.createSpyObj('Dialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        DashboardContentComponent,
        DashboardDialogComponent,
        PageHeaderComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should call open dialog once if user is not whitelisted', () => {
    userServiceSpy.getUser.and.returnValue(
      of({
        login: 'testLogin',
        profileImage: 'testProfileImage',
        isWhitelisted: false
      })
    );

    fixture.detectChanges();

    expect(dialogSpy.open.calls.count()).toBe(1, 'one call');
  });
});
