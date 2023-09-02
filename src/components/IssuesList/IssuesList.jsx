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
  }, [page, navigate, setIssues]);

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

export default React.memo(IssueList);

const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin: 20px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }

  div {
    margin-bottom: 8px;
  }

  div:last-child {
    margin-bottom: 0;
  }
  div {
    margin-bottom: 10px;
    font-size: 14px;
    color: #4a5568;
  }

  div:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #2d3748;
  }
`;

const AdImage = styled.img`
  display: block;
  margin: 25px auto;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  }
`;
