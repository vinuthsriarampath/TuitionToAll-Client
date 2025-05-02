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
}

const BASE_URL = 'https://tuitiontoall-production.up.railway.app';

export const environment: Environment = {
  AUTH_API: `${BASE_URL}/api/v2/auth`,
  USER_API: `${BASE_URL}/api/v2/users`
};
