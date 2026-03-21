import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatchDialogComponent } from './update-batch-dialog.component';

describe('UpdateBatchDialogComponent', () => {
  let component: UpdateBatchDialogComponent;
  let fixture: ComponentFixture<UpdateBatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBatchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
