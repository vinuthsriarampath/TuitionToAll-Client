import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTeacherPanelComponent } from './module-teacher-panel.component';

describe('ModuleTeacherPanelComponent', () => {
  let component: ModuleTeacherPanelComponent;
  let fixture: ComponentFixture<ModuleTeacherPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleTeacherPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTeacherPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
