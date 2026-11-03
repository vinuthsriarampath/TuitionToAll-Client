import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUpdateDialogComponent } from './post-update-dialog.component';

describe('PostUpdateDialogComponent', () => {
  let component: PostUpdateDialogComponent;
  let fixture: ComponentFixture<PostUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
