import {HttpParams} from '@angular/common/http';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';

export const buildPaginationParams = (pagination:PaginationRequest):HttpParams =>{
  let params = new HttpParams()
    .set('page', pagination.page)
    .set('size', pagination.size)
    .set('direction', pagination.direction);

  pagination.sortBy.forEach(sort => {
    params = params.append('sortBy', sort);
  });

  return params;
}
export const addFilterParams = (params: HttpParams, filters: object): HttpParams => {

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, value);
    }
  });

  return params;
}



