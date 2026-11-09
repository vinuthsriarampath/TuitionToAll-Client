import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {TempMessageAttachmentResponse} from '@features/messaging/dtos/responses/temp-message-attachment-response';

@Injectable({
  providedIn: 'root'
})
export class ChatAttachmentService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.MESSAGE_ATTACHMENT_API ?? '';

  uploadAttachment(file: File[]): Observable<ApiResponse<TempMessageAttachmentResponse[]>>{

    const formData = new FormData();
    file.forEach(f => {
      formData.append('files', f);
    });

    return this.http.post<ApiResponse<TempMessageAttachmentResponse[]>>(`${this.baseUrl}/upload`, formData);
  }


}
