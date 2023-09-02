import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueDetailItem } from '@/utils/issueUtils';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Loading from '@/components/LoadingSpinner/LoadingSpinner';

function IssueDetail() {
  const { issueId } = useParams();
  const [data, setData] = useState({
    issue: null,
    markdownContent: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const fetchedIssue = await getIssueDetailItem(issueId);
        if (fetchedIssue) {
          setData({
            issue: fetchedIssue,
            markdownContent: fetchedIssue.body,
          });
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchIssueDetail();
  }, [issueId]);

  if (error) return <div>Error loading the issue.</div>;
  if (!data.issue) return <Loading />;

  return (
    <IssueWrapper>
      <IssueNumber>Issue #{data.issue.number}</IssueNumber>
      <IssueTitle>{data.issue.title}</IssueTitle>
      <AuthorWrapper>
        <AuthorImage src={data.issue.user.avatar_url} alt={data.issue.user.login} />
        <AuthorName>Written by: {data.issue.user.login}</AuthorName>
      </AuthorWrapper>
      <IssueContent>
        <ReactMarkdown>{data.markdownContent}</ReactMarkdown>
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
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    line-height: 1.25;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.3em;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }

  a {
    color: #0366d6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  pre {
    padding: 16px;
    overflow: auto;
    line-height: 1.45;
    background-color: #2e2e2e;
    color: white;
    border-radius: 6px;
    margin: 16px 0;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #f6f8fa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
  }

  pre > code {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: 0;
  }

  ul,
  ol {
    padding-left: 20px;
    margin-top: 8px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px 0;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  blockquote {
    margin: 16px 0;
    padding: 0 15px;
    color: #6a737d;
    border-left: 0.25em solid #e0e0e0;
  }
`;
