import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { UserService } from 'src/client/services/user.service';
import { AuthService } from 'src/client/services/auth.service';
import { asyncData } from 'src/test/async-observable-helpers';

@Component({ selector: 'app-page-header', template: '' })
class PageHeaderComponent { }

@Component({ selector: 'app-dashboard-content', template: '' })
class DashboardContentComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userServiceSpy: { getUser: jasmine.Spy };
  let authServiceSpy: { logout: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let matDialogRefSpy: { afterClosed: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    matDialogSpy = jasmine.createSpyObj('Dialog', ['open']);
    matDialogRefSpy = jasmine.createSpyObj('DialogRef', ['afterClosed']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        DashboardContentComponent,
        DashboardDialogComponent,
        PageHeaderComponent,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  describe('openDialog', () => {
    it('should open the dialog once', () => {
      userServiceSpy.getUser.and.returnValue(asyncData(undefined));
      authServiceSpy.logout.and.returnValue(asyncData(undefined));
      matDialogRefSpy.afterClosed.and.returnValue(asyncData(undefined));
      matDialogSpy.open.and.returnValue(matDialogRefSpy);
      routerSpy.navigate.and.stub();

      component.openDialog();

      expect(matDialogSpy.open.calls.count()).toBe(1, 'one call to open dialog');
    });
  });
});
