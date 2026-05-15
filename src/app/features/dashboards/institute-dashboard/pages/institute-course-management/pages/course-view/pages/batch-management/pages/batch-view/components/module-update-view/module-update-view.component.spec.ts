import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUpdateViewComponent } from './module-update-view.component';

describe('ModuleUpdateViewComponent', () => {
  let component: ModuleUpdateViewComponent;
  let fixture: ComponentFixture<ModuleUpdateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUpdateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
