import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseAnnouncementListComponent} from './course-announcement-list.component';

describe('CourseAnnouncementListComponent', () => {
  let component: CourseAnnouncementListComponent;
  let fixture: ComponentFixture<CourseAnnouncementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAnnouncementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
