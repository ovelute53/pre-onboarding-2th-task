import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueDetailItem } from '@/utils/issueUtils';

function IssueDetail() {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();
  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const fetchedIssue = await getIssueDetailItem(issueId);
        setIssue(fetchedIssue);
      } catch (error) {
        console.error('Error fetching issue detail:', error);
      }
    };

    fetchIssueDetail();
  }, [issueId]);

  if (!issue) return <div>Loading...</div>;

  return (
    <div>
      <h1>{issue.title}</h1>
      <div>
        <strong>Written by:</strong> {issue.user.login}
      </div>
      <img src={issue.user.avatar_url} alt={issue.user.login} width={50} />
      <p>{issue.body}</p>
    </div>
  );
}

export default IssueDetail;
