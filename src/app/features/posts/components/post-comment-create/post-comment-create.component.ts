import {Component, inject, input, output} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostCommentResponse} from '@features/posts/dtos/responses/post-comment-response';
import {LucideAngularModule, Send} from 'lucide-angular';
import {PostService} from '@features/posts/services/post-service/post.service';
import {PostCommentRequest} from '@features/posts/dtos/requests/post-comment-request';

@Component({
  selector: 'app-post-comment-create',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-comment-create.component.html',
  styleUrl: './post-comment-create.component.css'
})
export class PostCommentCreateComponent {
  postId = input.required<number>();
  commented = output<PostCommentResponse>();

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly postService = inject(PostService);

  protected readonly Send = Send;
  protected isSubmitting = false;

  protected readonly commentForm = this.fb.group({
    comment: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  protected get hasContent(): boolean {
    return !!this.commentForm.controls.comment.value.trim();
  }

  protected autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  protected onSubmit(): void {
    if (this.commentForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const commentText = this.commentForm.controls.comment.value.trim();

    const request: PostCommentRequest = {
      message: commentText
    }

    this.postService.commentPost(this.postId(), request).subscribe({
      next: (res) => {
        if (res.data){
          this.commented.emit(res.data);
        }
        this.commentForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting comment:', err);
        this.isSubmitting = false;
      }
    });
  }
}
