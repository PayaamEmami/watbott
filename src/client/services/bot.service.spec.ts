import { HttpErrorResponse } from '@angular/common/http';

import { BotService, Bot } from './bot.service';
import { asyncData, asyncError } from './../../test/async-observable-helpers';

describe('BotService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  let botService: BotService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    botService = new BotService(httpClientSpy as any);
  });

  describe('getBot', () => {
    it('should only call HttpClient once', () => {
      const expectedBot: Bot[] = [{ isInChannel: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedBot));

      botService.getBot().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return expected Bot', async () => {
      const expectedBot: Bot[] = [{ isInChannel: true }];

      httpClientSpy.get.and.returnValue(asyncData(expectedBot));

      await botService.getBot().subscribe(
        bot => expect(bot).toEqual(expectedBot, 'expected Bot'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      await botService.getBot().subscribe(
        () => fail('expected an error, not bot'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });

  });

  describe('joinChannel', () => {
    it('should only call HttpClient once', () => {
      const expectedBot: Bot[] = [{ isInChannel: true }];

      httpClientSpy.put.and.returnValue(asyncData(expectedBot));

      botService.joinChannel().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('should return expected Bot', async () => {
      const expectedBot: Bot[] = [{ isInChannel: true }];

      httpClientSpy.put.and.returnValue(asyncData(expectedBot));

      await botService.joinChannel().subscribe(
        bot => expect(bot).toEqual(expectedBot, 'expected Bot'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.put.and.returnValue(asyncError(errorResponse));

      await botService.joinChannel().subscribe(
        () => fail('expected an error, not bot'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });
  });

  describe('partChannel', () => {
    it('should only call HttpClient once', () => {
      const expectedBot: Bot[] = [{ isInChannel: false }];

      httpClientSpy.put.and.returnValue(asyncData(expectedBot));

      botService.partChannel().subscribe(
        () => { },
        fail
      );

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('should return expected Bot', async () => {
      const expectedBot: Bot[] = [{ isInChannel: true }];

      httpClientSpy.put.and.returnValue(asyncData(expectedBot));

      await botService.partChannel().subscribe(
        bot => expect(bot).toEqual(expectedBot, 'expected Bot'),
        fail
      );
    });

    it('should return an error when the server returns a 404', async () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClientSpy.put.and.returnValue(asyncError(errorResponse));

      await botService.partChannel().subscribe(
        () => fail('expected an error, not bot'),
        error => expect(error).toEqual('Something bad happened; please try again later.')
      );
    });
  });
});
