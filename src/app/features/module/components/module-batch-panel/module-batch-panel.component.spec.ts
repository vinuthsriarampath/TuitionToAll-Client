import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBatchPanelComponent } from './module-batch-panel.component';

describe('ModuleBatchPanelComponent', () => {
  let component: ModuleBatchPanelComponent;
  let fixture: ComponentFixture<ModuleBatchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleBatchPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleBatchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
