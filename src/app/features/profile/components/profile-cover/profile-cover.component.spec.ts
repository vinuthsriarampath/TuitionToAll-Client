import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCoverComponent } from './profile-cover.component';

describe('ProfileCoverComponent', () => {
  let component: ProfileCoverComponent;
  let fixture: ComponentFixture<ProfileCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
