import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleNamePanelComponent } from './module-name-panel.component';

describe('ModuleNamePanelComponent', () => {
  let component: ModuleNamePanelComponent;
  let fixture: ComponentFixture<ModuleNamePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleNamePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleNamePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
