import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { announcementResolver } from './announcement.resolver';

describe('announcementResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => announcementResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
