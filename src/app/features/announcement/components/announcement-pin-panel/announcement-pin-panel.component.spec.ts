import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementPinPanelComponent} from './announcement-pin-panel.component';

describe('AnnouncementPinPanelComponent', () => {
  let component: AnnouncementPinPanelComponent;
  let fixture: ComponentFixture<AnnouncementPinPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementPinPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementPinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
