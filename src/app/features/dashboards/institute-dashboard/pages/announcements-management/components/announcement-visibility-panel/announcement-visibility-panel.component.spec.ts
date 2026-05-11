import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementVisibilityPanelComponent } from './announcement-visibility-panel.component';

describe('AnnouncementVisibilityPanelComponent', () => {
  let component: AnnouncementVisibilityPanelComponent;
  let fixture: ComponentFixture<AnnouncementVisibilityPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementVisibilityPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementVisibilityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
