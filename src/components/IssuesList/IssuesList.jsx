import React, { useState, useEffect } from 'react';
import { getIssueList } from '@/utils/issueUtils';
import { useIssues } from '@/context/IssueContext';

function IssueList() {
  const { issues, setIssues } = useIssues();
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const fetchedIssues = await getIssueList(page, PER_PAGE);
        setIssues(prevIssues => [...prevIssues, ...fetchedIssues]);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, [page]);

  return (
    <div>
      {issues.map(issue => (
        <div key={issue.id}>{issue.title}</div>
      ))}
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
    </div>
  );
}

export default IssueList;
