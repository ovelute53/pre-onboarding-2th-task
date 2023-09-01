import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header/Header';
import IssueList from '@/components/IssuesList/IssuesList';
import { IssueProvider } from '@/context/IssueContext';

function App() {
  return (
    <IssueProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<IssueList />} />
        </Routes>
      </Router>
    </IssueProvider>
  );
}

export default App;
