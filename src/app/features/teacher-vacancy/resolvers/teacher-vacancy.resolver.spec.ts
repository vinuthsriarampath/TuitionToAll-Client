import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {teacherVacancyResolver} from './teacher-vacancy.resolver';

describe('teacherVacancyResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => teacherVacancyResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
