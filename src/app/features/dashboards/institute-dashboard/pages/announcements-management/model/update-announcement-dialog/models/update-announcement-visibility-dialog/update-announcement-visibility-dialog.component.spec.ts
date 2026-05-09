import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnouncementVisibilityDialogComponent } from './update-announcement-visibility-dialog.component';

describe('UpdateAnnouncementVisibilityDialogComponent', () => {
  let component: UpdateAnnouncementVisibilityDialogComponent;
  let fixture: ComponentFixture<UpdateAnnouncementVisibilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAnnouncementVisibilityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnnouncementVisibilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
