import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnnouncementViewComponent } from './course-announcement-view.component';

describe('CourseAnnouncementViewComponent', () => {
  let component: CourseAnnouncementViewComponent;
  let fixture: ComponentFixture<CourseAnnouncementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAnnouncementViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAnnouncementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
