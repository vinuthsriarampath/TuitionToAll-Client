import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBadgeComponent } from './module-badge.component';

describe('ModuleBadgeComponent', () => {
  let component: ModuleBadgeComponent;
  let fixture: ComponentFixture<ModuleBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
