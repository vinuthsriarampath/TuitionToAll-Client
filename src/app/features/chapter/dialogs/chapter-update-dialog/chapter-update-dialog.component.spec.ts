import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChapterUpdateDialogComponent} from './chapter-update-dialog.component';

describe('ChapterUpdateDialogComponent', () => {
  let component: ChapterUpdateDialogComponent;
  let fixture: ComponentFixture<ChapterUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
