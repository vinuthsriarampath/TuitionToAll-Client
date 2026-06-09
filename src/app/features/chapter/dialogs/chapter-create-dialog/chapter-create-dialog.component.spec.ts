import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChapterCreateDialogComponent} from './chapter-create-dialog.component';

describe('ChapterCreateDialogComponent', () => {
  let component: ChapterCreateDialogComponent;
  let fixture: ComponentFixture<ChapterCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
