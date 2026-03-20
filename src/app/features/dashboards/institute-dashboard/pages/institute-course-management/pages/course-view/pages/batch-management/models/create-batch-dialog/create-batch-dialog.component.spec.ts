import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchDialogComponent } from './create-batch-dialog.component';

describe('CreateBatchDialogComponent', () => {
  let component: CreateBatchDialogComponent;
  let fixture: ComponentFixture<CreateBatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBatchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
