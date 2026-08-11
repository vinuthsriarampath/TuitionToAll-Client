/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

interface Environment {
  AUTH_API: string;
  USER_API:string;
  USER_PROFILE_API:string;
  SEARCH_API:string;
  COURSE_API:string;
  BATCH_API:string;
  TEACHER_VACANCY_API:string;
  INSTITUTE_API?:string;
  APPLICATION_API?:string;
  INSTITUTE_TEACHER_API?:string;
  ANNOUNCEMENT_API?:string;
  MODULE_API?:string;
  CHAPTER_API?:string;
  LECTURE_RECORD_API?:string;
  SCHEDULE_LECTURE_API?:string;
  RESOURCE_API?:string;
  ASSIGNMENT_API?:string;
  MODULE_ASSIGNMENT_API?:string;
  CHAPTER_ASSIGNMENT_API?:string;
  STUDENT_ENROLLMENT_API?:string;
}

const BASE_URL = 'http://localhost:8080/api/v2';

export const environment: Environment = {
  AUTH_API: `${BASE_URL}/auth`,
  USER_API: `${BASE_URL}/users`,
  USER_PROFILE_API: `${BASE_URL}/profile-files`,
  SEARCH_API: `${BASE_URL}/search`,
  COURSE_API: `${BASE_URL}/courses`,
  BATCH_API: `${BASE_URL}/batches`,
  TEACHER_VACANCY_API: `${BASE_URL}/vacancies`,
  INSTITUTE_API: `${BASE_URL}/institutes`,
  APPLICATION_API: `${BASE_URL}/applications`,
  INSTITUTE_TEACHER_API: `${BASE_URL}/institutes/teachers`,
  ANNOUNCEMENT_API: `${BASE_URL}/announcements`,
  MODULE_API: `${BASE_URL}/modules`,
  CHAPTER_API: `${BASE_URL}/chapters`,
  LECTURE_RECORD_API: `${BASE_URL}/lecture-records`,
  SCHEDULE_LECTURE_API: `${BASE_URL}/schedule-lectures`,
  RESOURCE_API: `${BASE_URL}/resources`,
  ASSIGNMENT_API: `${BASE_URL}/assignments`,
  MODULE_ASSIGNMENT_API: `${BASE_URL}/module-assignments`,
  CHAPTER_ASSIGNMENT_API: `${BASE_URL}/chapter-assignments`,
  STUDENT_ENROLLMENT_API: `${BASE_URL}/enrollments`,
};

