import { TestBed } from '@angular/core/testing';

import { TeacherVacancyService } from './teacher-vacancy.service';

describe('TeacherVacancyService', () => {
  let service: TeacherVacancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherVacancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
