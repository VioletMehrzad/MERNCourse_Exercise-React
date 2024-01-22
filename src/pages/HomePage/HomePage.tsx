import { type FC } from 'react';
import UsersListAPI from './partials/UsersListAPI';
import UsersList from './partials/UsersList';

const HomePage: FC = () => {
  return (
    <>
      <UsersList />
      <hr className="w-1/2" />
      <UsersListAPI />
    </>
  );
};

export default HomePage;
