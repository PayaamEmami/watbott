import { HttpErrorResponse } from '@angular/common/http';

import { AuthService, Auth } from './auth.service';
import { asyncData, asyncError } from './../../test/async-observable-helpers';

describe('AuthService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  let authService: AuthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    authService = new AuthService(httpClientSpy as any);
  });

  describe('getAuth', () => {
    it('should only call HttpClient once', () => {
      const expectedAuth: Auth[] = [{ isAuthenticated: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedAuth));

      authService.getAuth().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return expected Auth', async () => {
      const expectedAuth: Auth[] = [{ isAuthenticated: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedAuth));

      await authService.getAuth().subscribe(
        auth => expect(auth).toEqual(expectedAuth, 'expected Auth'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      await authService.getAuth().subscribe(
        () => fail('expected an error, not auth'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });
  });

  describe('logout', () => {
    it('should only call HttpClient once', () => {
      const expectedAuth: Auth[] = [{ isAuthenticated: true }];

      httpClientSpy.put.and.returnValue(asyncData(expectedAuth));

      authService.logout().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('should return expected Auth', async () => {
      const expectedAuth: Auth[] = [{ isAuthenticated: false }];

      httpClientSpy.put.and.returnValue(asyncData(expectedAuth));

      await authService.logout().subscribe(
        auth => expect(auth).toEqual(expectedAuth, 'expected Auth'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.put.and.returnValue(asyncError(errorResponse));

      await authService.logout().subscribe(
        () => fail('expected an error, not auth'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });
  });
});
