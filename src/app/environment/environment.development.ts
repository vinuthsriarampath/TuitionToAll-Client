interface Environment {
  AUTH_API: string;
}

const P_BASE_URL = 'https://tuitiontoall-production.up.railway.app';
const D_BASE_URL = 'http://localhost:8080';

export const environment: Environment = {
  AUTH_API: `${D_BASE_URL}/api/v2/auth`,
};

