import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const AUTH_URL = 'https://www.themoviedb.org/authenticate/';

export const moviesApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const response = await moviesApi.get('/authentication/token/new');

    if (response.data.success) {
      const { request_token: token } = response.data;
      localStorage.setItem('request_token', token);

      // Proceed to authenticate the token
      window.location.href = `${AUTH_URL}${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.error('Sorry, your token could not be created.', error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (!token) {
    throw new Error('No request token found.');
  }

  try {
    const { data: { session_id } } = await moviesApi.post('authentication/session/new', {
      request_token: token,
    });

    localStorage.setItem('session_id', session_id);
    return session_id;
  } catch (error) {
    console.error('Failed to create a session ID.', error);
    throw error;
  }
};
