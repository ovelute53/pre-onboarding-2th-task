import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: import.meta.env.VITE_REACT_APP_OCTOKIT_TOKEN,
  baseURL: 'https://api.github.com/repos/facebook/react/issues',
});

const api = {
  fetchIssues: async (page = 1) => {
    try {
      const response = await octokit.issues.listForRepo({
        owner: 'facebook',
        repo: 'react',
        state: 'open',
        sort: 'comments',
        direction: 'desc',
        per_page: 30, // 예시로 30개의 이슈를 가져옵니다.
        page: page,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchIssueDetail: async issueNumber => {
    try {
      const response = await octokit.issues.get({
        owner: 'facebook',
        repo: 'react',
        issue_number: issueNumber,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
