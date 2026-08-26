import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewCreateCardComponent} from './review-create-card.component';

describe('ReviewCreateCardComponent', () => {
  let component: ReviewCreateCardComponent;
  let fixture: ComponentFixture<ReviewCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCreateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
