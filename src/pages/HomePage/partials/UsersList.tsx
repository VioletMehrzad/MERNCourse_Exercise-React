import { useContext, type FC } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { type RegisterSchema } from '../../RegisterPage';
import { store } from '../../../contexts';

const UsersList: FC = () => {
  const { users } = useContext(store);
  const { userId } = useParams();

  return (
    <div className="w-full lg:w-3/4 rounded-lg shadow flex flex-col sm:flex-row mb-8">
      <aside className="w-full sm:w-1/3 rounded-lg shadow px-3 py-4 overflow-y-auto bg-gray-50">
        <h1 className="font-bold text-lg pb-3">User&apos;s List (Registered)</h1>
        <hr />
        <ul className="space-y-2 font-medium pt-3">
          {users.map((i: RegisterSchema) => {
            return (
              <li key={i.id}>
                <Link
                  to={`/${i.id}`}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 ${
                    userId === i.id ? 'text-white bg-blue-600' : ''
                  }`}>
                  {i.fullName}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="w-full sm:w-2/3 flex justify-center items-center space-x-5 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UsersList;
