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

import {Student} from '../../../models/userModels/student';
import {User} from '../../../models/userModels/user';
import {Roles} from '../../../enums/roles';
import {Institute} from '../../../models/userModels/institute';
import {Teacher} from '../../../models/userModels/teacher';

export function isStudent(user: User): user is Student {
  return user.role === Roles.ROLE_STUDENT;
}

export function isTeacher(user: User): user is Teacher {
  return user.role === Roles.ROLE_TEACHER;
}

export function isInstitute(user: User): user is Institute {
  return user.role === Roles.ROLE_INSTITUTE;
}
