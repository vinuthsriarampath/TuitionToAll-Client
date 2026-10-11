import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMediaAttachmentGalleryComponent } from './post-media-attachment-gallery.component';

describe('PostMediaAttachmentGalleryComponent', () => {
  let component: PostMediaAttachmentGalleryComponent;
  let fixture: ComponentFixture<PostMediaAttachmentGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostMediaAttachmentGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMediaAttachmentGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
