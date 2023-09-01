import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header/Header';
import IssueList from '@/components/IssuesList/IssuesList';
import { IssueProvider } from '@/context/IssueContext';
import IssueDetail from '@/components/IssueDetail/IssueDetail';
import ErrorPage from '@/page/ErrorPage';

function App() {
  return (
    <IssueProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/issue/:issueId" element={<IssueDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </IssueProvider>
  );
}

export default App;
