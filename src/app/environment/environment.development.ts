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
}

const P_BASE_URL = 'https://tuitiontoall-production.up.railway.app';
const D_BASE_URL = 'http://localhost:8080';

export const environment: Environment = {
  AUTH_API: `${D_BASE_URL}/api/v2/auth`,
};

