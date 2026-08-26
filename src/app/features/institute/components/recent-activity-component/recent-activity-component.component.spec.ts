import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecentActivityComponentComponent} from './recent-activity-component.component';

describe('RecentActivityComponentComponent', () => {
  let component: RecentActivityComponentComponent;
  let fixture: ComponentFixture<RecentActivityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentActivityComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentActivityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
