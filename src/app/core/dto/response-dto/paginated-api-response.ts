export interface PaginatedApiResponse<T> {
  message?: string;
  data?: T[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
}
