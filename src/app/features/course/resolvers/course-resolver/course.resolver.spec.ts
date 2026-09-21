import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {courseResolver} from './course.resolver';
import {Course} from '@features/course/dtos/response/course';

describe('courseResolver', () => {
  const executeResolver: ResolveFn<Course> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => courseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
