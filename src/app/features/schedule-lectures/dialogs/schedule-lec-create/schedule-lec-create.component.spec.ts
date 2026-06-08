import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLecCreateComponent } from './schedule-lec-create.component';

describe('ScheduleLecCreateComponent', () => {
  let component: ScheduleLecCreateComponent;
  let fixture: ComponentFixture<ScheduleLecCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLecCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLecCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
