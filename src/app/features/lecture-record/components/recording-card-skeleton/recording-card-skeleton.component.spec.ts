import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordingCardSkeletonComponent} from './recording-card-skeleton.component';

describe('RecordingCardSkeletonComponent', () => {
  let component: RecordingCardSkeletonComponent;
  let fixture: ComponentFixture<RecordingCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordingCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
