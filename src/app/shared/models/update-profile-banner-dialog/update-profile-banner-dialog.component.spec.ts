import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileBannerDialogComponent } from './update-profile-banner-dialog.component';

describe('UpdateProfileBannerDialogComponent', () => {
  let component: UpdateProfileBannerDialogComponent;
  let fixture: ComponentFixture<UpdateProfileBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfileBannerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
