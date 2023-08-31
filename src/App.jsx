import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';

function App() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}

export default App;
