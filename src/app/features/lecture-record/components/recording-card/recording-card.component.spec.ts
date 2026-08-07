import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingCardComponent } from './recording-card.component';

describe('RecordingCardComponent', () => {
  let component: RecordingCardComponent;
  let fixture: ComponentFixture<RecordingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
