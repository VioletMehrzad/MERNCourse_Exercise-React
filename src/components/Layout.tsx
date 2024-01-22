import { useState, type FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: FC = () => {
  const [params, setParams] = useState(location.pathname);

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/Logo.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Connect</span>
          </Link>
          <div className="flex items-center justify-between">
            <ul className="flex flex-row font-medium p-0 rounded-lg space-x-8">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setParams('/');
                  }}
                  className={
                    params === '/' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-400'
                  }>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => {
                    setParams('/about');
                  }}
                  className={
                    params === '/about' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-400'
                  }>
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => {
                    setParams('/register');
                  }}
                  className={
                    params === '/register' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-400'
                  }>
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    setParams('/login');
                  }}
                  className={
                    params === '/login' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-400'
                  }>
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center px-6 py-8 md:min-h-dvh">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
