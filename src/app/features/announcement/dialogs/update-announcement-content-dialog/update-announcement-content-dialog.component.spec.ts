import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateAnnouncementContentDialogComponent} from './update-announcement-content-dialog.component';

describe('UpdateAnnouncementContentDialogComponent', () => {
  let component: UpdateAnnouncementContentDialogComponent;
  let fixture: ComponentFixture<UpdateAnnouncementContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAnnouncementContentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnnouncementContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
