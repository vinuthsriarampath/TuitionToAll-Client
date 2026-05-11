import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementPublicationPanelComponent } from './announcement-publication-panel.component';

describe('AnnouncementPublicationPanelComponent', () => {
  let component: AnnouncementPublicationPanelComponent;
  let fixture: ComponentFixture<AnnouncementPublicationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementPublicationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementPublicationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
