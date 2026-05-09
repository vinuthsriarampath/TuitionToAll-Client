import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnouncementComponent } from './view-announcement.component';

describe('ViewAnnouncementComponent', () => {
  let component: ViewAnnouncementComponent;
  let fixture: ComponentFixture<ViewAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
