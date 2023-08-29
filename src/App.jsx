import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IssuesList from '@/components/IssuesList/IssuesList';
import IssueDetail from '@/components/IssueDetail/IssueDetail';
import GlobalStyles from '@/styles/GlobalStyles';
import Header from '@/components/Header/Header';

function App() {
  return (
    <Router>
      <Routes>
        <GlobalStyles />
        <Header />
        <Route path="/" exact Component={IssuesList} />
        <Route path="/issues/:issueNumber" Component={IssueDetail} />
      </Routes>
    </Router>
  );
}

export default App;
