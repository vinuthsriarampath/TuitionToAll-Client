import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceWidgetComponent} from './performance-widget.component';

describe('PerformanceWidgetComponent', () => {
  let component: PerformanceWidgetComponent;
  let fixture: ComponentFixture<PerformanceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
