import { type FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import SingleUserInfo from './pages/HomePage/partials/SingleUserInfo';
import StoreProvider from './contexts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: '/:userId',
            element: <SingleUserInfo />
          },
          {
            path: '/',
            element: (
              <h1 className="text-slate-400">Select an item from the list to show details.</h1>
            )
          }
        ]
      },
      {
        path: '/about',
        element: <h1>This page is currently blank.</h1>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  }
]);

const App: FC = () => {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};

export default App;
