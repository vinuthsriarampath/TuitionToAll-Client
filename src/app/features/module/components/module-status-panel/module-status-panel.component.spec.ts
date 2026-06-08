import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleStatusPanelComponent } from './module-status-panel.component';

describe('ModuleStatusPanelComponent', () => {
  let component: ModuleStatusPanelComponent;
  let fixture: ComponentFixture<ModuleStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleStatusPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
