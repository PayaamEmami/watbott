import { HttpErrorResponse } from '@angular/common/http';

import { AuthService, Auth } from './auth.service';
import { asyncData, asyncError } from './../../testing/async-observable-helpers';

describe('AuthService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  let authService: AuthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    authService = new AuthService(httpClientSpy as any);
  });

  it('getAuth should only call HttpClient once', () => {
    const expectedAuth: Auth[] = [{ isAuthenticated: true }];

    httpClientSpy.get.and.returnValue(asyncData(expectedAuth));

    authService.getAuth().subscribe(
      () => { },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('getAuth should return expected Auth', async () => {
    const expectedAuth: Auth[] = [{ isAuthenticated: true }];

    httpClientSpy.get.and.returnValue(asyncData(expectedAuth));

    await authService.getAuth().subscribe(
      auth => expect(auth).toEqual(expectedAuth, 'expected Auth'),
      fail
    );
  });

  it('getAuth should return an error when the server returns a 404', async () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    await authService.getAuth().subscribe(
      auth => fail('expected an error, not auth'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });

  it('logout should only call HttpClient once', () => {
    const expectedAuth: Auth[] = [{ isAuthenticated: true }];

    httpClientSpy.put.and.returnValue(asyncData(expectedAuth));

    authService.logout().subscribe(
      () => { },
      fail
    );

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('logout should return expected Auth', async () => {
    const expectedAuth: Auth[] = [{ isAuthenticated: false }];

    httpClientSpy.put.and.returnValue(asyncData(expectedAuth));

    await authService.logout().subscribe(
      auth => expect(auth).toEqual(expectedAuth, 'expected Auth'),
      fail
    );
  });

  it('logout should return an error when the server returns a 404', async () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.put.and.returnValue(asyncError(errorResponse));

    await authService.logout().subscribe(
      auth => fail('expected an error, not auth'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });
});
