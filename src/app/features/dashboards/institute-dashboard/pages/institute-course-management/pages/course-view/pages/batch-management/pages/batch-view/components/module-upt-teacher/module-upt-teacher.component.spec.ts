import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUptTeacherComponent } from './module-upt-teacher.component';

describe('ModuleUptTeacherComponent', () => {
  let component: ModuleUptTeacherComponent;
  let fixture: ComponentFixture<ModuleUptTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUptTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUptTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
