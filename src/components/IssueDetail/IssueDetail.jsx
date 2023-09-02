import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueDetailItem } from '@/utils/issueUtils';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Loading from '@/components/LoadingSpinner/LoadingSpinner';

function IssueDetail() {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const fetchedIssue = await getIssueDetailItem(issueId);
        if (fetchedIssue) {
          setIssue(fetchedIssue);
          setMarkdownContent(fetchedIssue.body);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssueDetail();
  }, [issueId]);

  if (!issue) return <Loading />;

  return (
    <IssueWrapper>
      <IssueNumber>Issue #{issue.number}</IssueNumber>
      <IssueTitle>{issue.title}</IssueTitle>
      <AuthorWrapper>
        <AuthorImage src={issue.user.avatar_url} alt={issue.user.login} />
        <AuthorName>Written by: {issue.user.login}</AuthorName>
      </AuthorWrapper>
      <IssueContent>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </IssueContent>
    </IssueWrapper>
  );
}

export default IssueDetail;

const IssueWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 800px;
  margin: 20px auto;
`;

const IssueTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const IssueNumber = styled.span`
  font-size: 18px;
  color: #777;
  margin-bottom: 10px;
  display: block;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.strong`
  font-size: 16px;
  color: #555;
`;

const IssueContent = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;

  img {
    max-width: 100%;
    height: auto;
  }
  pre {
    padding: 16px;
    overflow: auto;
    line-height: 1.45;
    background-color: #2e2e2e;
    color: white;
    border-radius: 3px;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #ffe8d4;
    border-radius: 10px;
  }

  pre > code {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: 0;
  }
`;
