import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIssueDetailItem } from '@/utils/issueUtils';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

function IssueDetail() {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const fetchedIssue = await getIssueDetailItem(issueId);
        setIssue(fetchedIssue);
        setMarkdownContent(issue.body);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssueDetail();
  });

  if (!issue) return <div>Loading...</div>;

  return (
    <IssueWrapper>
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
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 4px;
`;
