import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectionSectionComponent } from './batch-selection-section.component';

describe('BatchSelectionSectionComponent', () => {
  let component: BatchSelectionSectionComponent;
  let fixture: ComponentFixture<BatchSelectionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchSelectionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSelectionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
