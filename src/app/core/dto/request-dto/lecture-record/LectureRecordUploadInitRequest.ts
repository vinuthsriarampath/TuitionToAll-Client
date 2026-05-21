export class LectureRecordUploadInitRequest{
  title!:string;
  recordedDate!:Date;
  chapterId!:number;
  originalFileName!:string;
  totalSize!:number;
  totalChunks!:number;
}
