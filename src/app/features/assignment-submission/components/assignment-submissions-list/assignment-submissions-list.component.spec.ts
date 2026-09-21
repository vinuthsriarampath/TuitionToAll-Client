import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionsListComponent } from './assignment-submissions-list.component';

describe('AssignmentSubmissionsListComponent', () => {
  let component: AssignmentSubmissionsListComponent;
  let fixture: ComponentFixture<AssignmentSubmissionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentSubmissionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentSubmissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
