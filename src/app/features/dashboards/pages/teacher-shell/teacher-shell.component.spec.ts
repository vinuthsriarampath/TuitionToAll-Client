import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherShellComponent } from './teacher-shell.component';

describe('TeacherShellComponent', () => {
  let component: TeacherShellComponent;
  let fixture: ComponentFixture<TeacherShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
