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

import { UserRegistrationRequest } from "../user-registration-request";

export interface StudentRegistrationRequest extends UserRegistrationRequest{
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
