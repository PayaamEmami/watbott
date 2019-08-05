import { HttpErrorResponse } from '@angular/common/http';

import { UserService, User } from './user.service';
import { asyncData, asyncError } from '../../test/async-observable-helpers';

describe('UserService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let userService: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(httpClientSpy as any);
  });

  describe('getUser', () => {
    it('should only call HttpClient once', () => {
      const expectedUser: User[] = [{ login: 'testLogin', profileImage: 'testProfileImage', isWhitelisted: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedUser));

      userService.getUser().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return expected User', async () => {
      const expectedUser: User[] = [{ login: 'testLogin', profileImage: 'testProfileImage', isWhitelisted: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedUser));

      await userService.getUser().subscribe(
        user => expect(user).toEqual(expectedUser, 'expected User'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      await userService.getUser().subscribe(
        () => fail('expected an error, not user'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });
  });
});
