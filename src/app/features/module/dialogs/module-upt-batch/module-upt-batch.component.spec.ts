import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUptBatchComponent } from './module-upt-batch.component';

describe('ModuleUptBatchComponent', () => {
  let component: ModuleUptBatchComponent;
  let fixture: ComponentFixture<ModuleUptBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUptBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUptBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
