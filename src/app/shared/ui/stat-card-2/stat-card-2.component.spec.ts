import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCard2Component } from './stat-card-2.component';

describe('StatCard2Component', () => {
  let component: StatCard2Component;
  let fixture: ComponentFixture<StatCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
