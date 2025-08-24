import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserProfilePicDialogComponent } from './update-user-profile-pic-dialog.component';

describe('UpdateUserProfilePicDialogComponent', () => {
  let component: UpdateUserProfilePicDialogComponent;
  let fixture: ComponentFixture<UpdateUserProfilePicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserProfilePicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserProfilePicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
