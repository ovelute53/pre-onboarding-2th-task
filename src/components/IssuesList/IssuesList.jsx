import React, { useState, useEffect, useCallback } from 'react';
import { getIssueList } from '@/utils/issueUtils';
import { useIssues } from '@/context/IssueContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { throttle } from '@/utils/throttle';
import adImg from '@/assets/wanted.webp';
import Loading from '@/components/LoadingSpinner/LoadingSpinner';

const PER_PAGE = 10;

function IssueList() {
  const { issues, setIssues } = useIssues();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleIssueClick = useCallback(
    issueId => {
      navigate(`/issue/${issueId}`);
    },
    [navigate],
  );

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const fetchedIssues = await getIssueList(page, PER_PAGE);
        const uniqueIssues = fetchedIssues.filter(
          fetchedIssue => !issues.some(issue => issue.id === fetchedIssue.id),
        );
        setIssues(prevIssues => [...prevIssues, ...uniqueIssues]);
      } catch (error) {
        console.error(error);
        navigate('/error');
      }
      setIsLoading(false);
    };

    fetchIssues();
  }, [page, issues, navigate, setIssues]);

  const throttledFunction = throttle(() => {
    if (!isLoading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setPage(prevPage => prevPage + 1);
    }
  }, 200);

  const handleScroll = useCallback(() => {
    throttledFunction();
  }, [throttledFunction]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {issues.map((issue, index) => (
            <React.Fragment key={issue.id}>
              <IssueContainer onClick={() => handleIssueClick(issue.number)}>
                <div>
                  <strong>#{issue.number}</strong> {issue.title}
                </div>
                <div>By: {issue.user.login}</div>
                <div>Date: {new Date(issue.created_at).toLocaleDateString()}</div>
                <div>Comments: {issue.comments}</div>
              </IssueContainer>
              {index % 5 === 4 && (
                <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
                  <AdImage src={adImg} alt="Advertisement" />
                </a>
              )}
            </React.Fragment>
          ))}
        </>
      )}
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

const AdImage = styled.img`
  display: block;
  margin: 20px auto;
  cursor: pointer;
`;
