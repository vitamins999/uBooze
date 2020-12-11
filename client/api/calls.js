import axios from 'axios';

const restAPI = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = async () => {
  try {
    const { data } = await restAPI.post('/auth/token');
    localStorage.setItem('accessToken', JSON.stringify(data.token));
  } catch (error) {
    // Redirects on 403 error from server (ie refresh token is invalid so user needs to login again)
    window.location.href = '/login?logout=true';
  }
};

restAPI.interceptors.request.use(async (config) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';

  return config;
});

restAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.data === 'jwt expired' ||
        error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await getAccessToken();
      return restAPI(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { restAPI };
