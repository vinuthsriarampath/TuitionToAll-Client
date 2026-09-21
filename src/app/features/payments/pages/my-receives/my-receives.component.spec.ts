import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReceivesComponent } from './my-receives.component';

describe('MyReceivesComponent', () => {
  let component: MyReceivesComponent;
  let fixture: ComponentFixture<MyReceivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReceivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReceivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
