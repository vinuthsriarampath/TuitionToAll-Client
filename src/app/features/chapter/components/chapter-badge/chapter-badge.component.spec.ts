import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChapterBadgeComponent} from './chapter-badge.component';

describe('ChapterBadgeComponent', () => {
  let component: ChapterBadgeComponent;
  let fixture: ComponentFixture<ChapterBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
