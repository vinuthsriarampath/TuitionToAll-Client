import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { teacherCourseResolver } from './teacher-course.resolver';

describe('teacherCourseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => teacherCourseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
