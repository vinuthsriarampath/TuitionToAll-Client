import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIntroComponent } from './profile-intro.component';

describe('ProfileIntroComponent', () => {
  let component: ProfileIntroComponent;
  let fixture: ComponentFixture<ProfileIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
