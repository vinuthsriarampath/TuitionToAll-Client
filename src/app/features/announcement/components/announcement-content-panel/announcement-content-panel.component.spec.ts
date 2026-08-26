import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementContentPanelComponent} from './announcement-content-panel.component';

describe('AnnouncementContentPanelComponent', () => {
  let component: AnnouncementContentPanelComponent;
  let fixture: ComponentFixture<AnnouncementContentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementContentPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
