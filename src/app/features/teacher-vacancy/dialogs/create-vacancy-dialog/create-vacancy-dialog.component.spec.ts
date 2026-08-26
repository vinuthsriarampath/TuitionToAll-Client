import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateVacancyDialogComponent} from './create-vacancy-dialog.component';

describe('CreateVacancyDialogComponent', () => {
  let component: CreateVacancyDialogComponent;
  let fixture: ComponentFixture<CreateVacancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVacancyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
