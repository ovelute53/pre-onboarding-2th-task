import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIssues } from '@/redux/modules/issuesSlice';
import AdImage from '@/components/AdImage/AdImage';

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
      {issues &&
        issues.map((issue, idx) => (
          <Fragment key={issue.number}>
            <div>
              {issue.title} - {issue.comments}
            </div>
            {(idx + 1) % 5 === 0 && <AdImage />}
          </Fragment>
        ))}
    </div>
  );
}

export default IssuesList;
