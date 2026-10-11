import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowingsComponent } from './my-followings.component';

describe('MyFollowingsComponent', () => {
  let component: MyFollowingsComponent;
  let fixture: ComponentFixture<MyFollowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFollowingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
