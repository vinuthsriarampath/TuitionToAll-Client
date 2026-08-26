export class PaginationRequest {
  page!: number;
  size!: number;
  direction!: string;
  sortBy!: string[];

  constructor(
    page: number = 0,
    size: number = 10,
    direction: string = 'desc',
    sortBy: string[] = ['created_date']
  ) {
    this.page = page;
    this.size = size;
    this.direction = direction;
    this.sortBy = sortBy.length > 0 ? sortBy : ['created_date'];
  }
}
