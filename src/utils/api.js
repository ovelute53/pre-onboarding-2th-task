import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react/issues',
});

if (process.env.NODE_ENV === 'development') {
  api.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
}

export default api;
