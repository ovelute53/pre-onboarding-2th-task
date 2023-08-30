import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssues } from "@/redux/modules/issuesSlice";
import AdImage from "@/components/AdImage/AdImage";

function IssuesList() {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.list);
  const loading = useSelector((state) => state.issues.loading);

  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  console.log(issues);

  useEffect(() => {
    dispatch(fetchIssues({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>
      {issues &&
        issues.map((issue, idx) => (
          <Fragment key={issue.number}>
            <div>
              {issue.title} - {issue.comments}
            </div>
            {(idx + 1) % 5 === 0 && <AdImage />}
          </Fragment>
        ))}
      {loading && <p>LOADING MORE...</p>}
    </div>
  );
}

export default IssuesList;
