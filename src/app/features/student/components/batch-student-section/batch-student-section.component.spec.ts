import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BatchStudentSectionComponent} from './batch-student-section.component';

describe('BatchStudentSectionComponent', () => {
  let component: BatchStudentSectionComponent;
  let fixture: ComponentFixture<BatchStudentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchStudentSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchStudentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
