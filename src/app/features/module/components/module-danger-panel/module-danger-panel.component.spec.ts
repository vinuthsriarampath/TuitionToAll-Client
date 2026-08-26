import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleDangerPanelComponent} from './module-danger-panel.component';

describe('ModuleDangerPanelComponent', () => {
  let component: ModuleDangerPanelComponent;
  let fixture: ComponentFixture<ModuleDangerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDangerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDangerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
