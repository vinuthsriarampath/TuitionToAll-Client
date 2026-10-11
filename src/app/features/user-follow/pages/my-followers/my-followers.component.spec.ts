import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowersComponent } from './my-followers.component';

describe('MyFollowersComponent', () => {
  let component: MyFollowersComponent;
  let fixture: ComponentFixture<MyFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFollowersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
