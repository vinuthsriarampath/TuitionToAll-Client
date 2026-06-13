import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentUpdateComponent } from './assignment-update.component';

describe('AssignmentUpdateComponent', () => {
  let component: AssignmentUpdateComponent;
  let fixture: ComponentFixture<AssignmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
