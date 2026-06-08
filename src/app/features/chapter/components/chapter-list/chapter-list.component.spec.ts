import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterListComponent } from './chapter-list.component';

describe('ChapterListComponent', () => {
  let component: ChapterListComponent;
  let fixture: ComponentFixture<ChapterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
