import axios from 'axios';

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: `application/vnd.github+json`,
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default api;
