import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActiveBatchesTableComponent} from './active-batches-table.component';

describe('ActiveBatchesTableComponent', () => {
  let component: ActiveBatchesTableComponent;
  let fixture: ComponentFixture<ActiveBatchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveBatchesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveBatchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
