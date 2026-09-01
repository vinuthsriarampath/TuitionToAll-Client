import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteShellComponent } from './institute-shell.component';

describe('InstituteShellComponent', () => {
  let component: InstituteShellComponent;
  let fixture: ComponentFixture<InstituteShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
