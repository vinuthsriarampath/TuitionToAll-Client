import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteJobsComponent } from './institute-jobs.component';

describe('InstituteJobsComponent', () => {
  let component: InstituteJobsComponent;
  let fixture: ComponentFixture<InstituteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
