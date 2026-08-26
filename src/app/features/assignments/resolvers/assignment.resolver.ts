import {ResolveFn} from '@angular/router';
import {AssignmentDetailedResponse} from '@features/assignments/dtos/response/assignment-detailed-response';
import {inject} from '@angular/core';
import {AssignmentService} from '@features/assignments/services/assignment/assignment.service';
import {map} from 'rxjs/operators';

export const assignmentResolver: ResolveFn<AssignmentDetailedResponse> = (route, state) => {
  const assignmentService = inject(AssignmentService);
  return assignmentService.getDetailedAssignmentById(Number(route.paramMap.get('assignmentId'))).pipe(
    map((res) => res.data as AssignmentDetailedResponse)
  );
};
