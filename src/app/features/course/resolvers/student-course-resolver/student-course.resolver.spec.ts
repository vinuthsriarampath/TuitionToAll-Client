import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { studentCourseResolver } from './student-course.resolver';

describe('studentCourseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => studentCourseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
