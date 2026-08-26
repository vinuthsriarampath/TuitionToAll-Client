import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleUptNameDialogComponent} from './module-upt-name-dialog.component';

describe('ModuleUptNameDialogComponent', () => {
  let component: ModuleUptNameDialogComponent;
  let fixture: ComponentFixture<ModuleUptNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUptNameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUptNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
