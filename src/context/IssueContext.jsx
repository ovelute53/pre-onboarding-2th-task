import React, { createContext, useContext, useState } from 'react';

const IssueContext = createContext();

export const useIssues = () => {
  return useContext(IssueContext);
};

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <IssueContext.Provider value={{ issues, setIssues, selectedIssue, setSelectedIssue }}>
      {children}
    </IssueContext.Provider>
  );
};
