import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOverlayComponent } from './loader-overlay.component';

describe('LoaderOverlayComponent', () => {
  let component: LoaderOverlayComponent;
  let fixture: ComponentFixture<LoaderOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
