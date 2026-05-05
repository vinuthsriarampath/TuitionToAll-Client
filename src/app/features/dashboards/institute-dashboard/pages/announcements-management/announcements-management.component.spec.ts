import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsManagementComponent } from './announcements-management.component';

describe('AnnouncementsManagementComponent', () => {
  let component: AnnouncementsManagementComponent;
  let fixture: ComponentFixture<AnnouncementsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
