import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterStatRowComponent } from './chapter-stat-row.component';

describe('ChapterStatRowComponent', () => {
  let component: ChapterStatRowComponent;
  let fixture: ComponentFixture<ChapterStatRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterStatRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterStatRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
