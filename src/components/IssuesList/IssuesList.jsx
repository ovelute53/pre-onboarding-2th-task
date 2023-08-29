import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIssues } from '../issuesSlice';

function IssuesList() {
  const dispatch = useDispatch();
  const issues = useSelector(state => state.issues.list);
  const loading = useSelector(state => state.issues.loading);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {issues.map(issue => (
        <div key={issue.number}>{issue.title}</div>
      ))}
    </div>
  );
}

export default IssuesList;
