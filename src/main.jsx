import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from '@/redux/store/store.js';
import IssuesList from '@/components/IssuesList/IssuesList.jsx';
import IssueDetail from '@/components/IssueDetail/IssueDetail.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <IssuesList />,
      },
      {
        path: '/:id',
        element: <IssueDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
