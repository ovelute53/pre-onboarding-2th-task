import React, { useState, useEffect } from 'react';
import { getIssueList } from '@/utils/issueUtils';
import { useIssues } from '@/context/IssueContext';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function IssueList() {
  const { issues, setIssues } = useIssues();
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const navigate = useNavigate();

  const handleIssueClick = issueId => {
    navigate(`/issue/${issueId}`);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const fetchedIssues = await getIssueList(page, PER_PAGE);
        setIssues(prevIssues => [...prevIssues, ...fetchedIssues]);
      } catch (error) {
        console.error(error);
        navigate('*');
      }
    };

    fetchIssues();
  }, [page]);

  return (
    <div>
      {issues.map(issue => (
        <IssueContainer key={issue.id} onClick={() => handleIssueClick(issue.number)}>
          <div>
            <strong>#{issue.number}</strong> {issue.title}
          </div>
          <div>By: {issue.user.login}</div>
          <div>Date: {new Date(issue.created_at).toLocaleDateString()}</div>
          <div>Comments: {issue.comments}</div>
        </IssueContainer>
      ))}
      <LoadMoreButton onClick={() => setPage(prevPage => prevPage + 1)}>Load More</LoadMoreButton>
    </div>
  );
}

export default IssueList;

const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0366d6;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0050a0;
  }
`;
