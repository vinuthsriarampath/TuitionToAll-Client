import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModuleDialogComponent } from './create-module-dialog.component';

describe('CreateModuleDialogComponent', () => {
  let component: CreateModuleDialogComponent;
  let fixture: ComponentFixture<CreateModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModuleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
