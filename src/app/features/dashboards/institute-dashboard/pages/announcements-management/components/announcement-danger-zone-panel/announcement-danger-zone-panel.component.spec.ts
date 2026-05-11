import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDangerZonePanelComponent } from './announcement-danger-zone-panel.component';

describe('AnnouncementDangerZonePanelComponent', () => {
  let component: AnnouncementDangerZonePanelComponent;
  let fixture: ComponentFixture<AnnouncementDangerZonePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementDangerZonePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementDangerZonePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
