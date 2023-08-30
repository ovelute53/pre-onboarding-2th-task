import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssueDetail } from "@/redux/modules/issuesSlice";

function IssueDetail() {
  const { issueNumber } = useParams();
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issues.currentIssue);
  const loading = useSelector((state) => state.issues.loading);

  useEffect(() => {
    dispatch(fetchIssueDetail(issueNumber));
  }, [dispatch, issueNumber]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.body}</p>
    </div>
  );
}

export default IssueDetail;
