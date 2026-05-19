import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterHeaderComponent } from './chapter-header.component';

describe('ChapterHeaderComponent', () => {
  let component: ChapterHeaderComponent;
  let fixture: ComponentFixture<ChapterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
