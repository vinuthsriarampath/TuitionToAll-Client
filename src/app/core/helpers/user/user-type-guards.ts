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

import {User} from '../../models/user-models/user';
import {Institute} from '../../models/user-models/institute';

export function isStudent(user: User): boolean{
  return user.role?.role === 'student';
}

export function isTeacher(user: User):boolean {
  return user.role?.role === 'teacher';
}

export function isInstitute(user: User): user is Institute{
  return user.role?.role === 'institute';
}
