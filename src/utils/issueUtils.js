import { api } from '@/utils/api';

const OWNER = 'facebook';
const REPO = 'react';

export const getIssueList = async (page, perPage) => {
  try {
    const response = await api.get(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues?per_page=${perPage}&page=${page}&sort=comments`,
    );
    console.info(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(String(err));
  }
};

export const getIssueDetailItem = async num => {
  try {
    const response = await api.get(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${number}`,
    );
    console.info(response.data);
    return response.data;
  } catch (err) {
    throw new Error(String(err));
  }
};
