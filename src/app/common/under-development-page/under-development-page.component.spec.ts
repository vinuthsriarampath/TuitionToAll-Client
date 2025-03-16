import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderDevelopmentPageComponent } from './under-development-page.component';

describe('UnderDevelopmentPageComponent', () => {
  let component: UnderDevelopmentPageComponent;
  let fixture: ComponentFixture<UnderDevelopmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderDevelopmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderDevelopmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
