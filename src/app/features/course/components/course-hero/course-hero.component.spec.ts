import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHeroComponent } from './course-hero.component';

describe('CourseHeroComponent', () => {
  let component: CourseHeroComponent;
  let fixture: ComponentFixture<CourseHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
