import axios, { type AxiosResponse } from 'axios';
import { useEffect, useState, type FC } from 'react';

interface UserAPI {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UsersListAPI: FC = () => {
  const [usersListAPI, setUsersListAPI] = useState<UserAPI[]>([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res: AxiosResponse<UserAPI[]>) => {
        setUsersListAPI(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-8 space-y-6 w-full lg:w-3/4">
      <h1 className="font-bold text-lg text-center">User&apos;s List (API Call)</h1>
      <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-6">
        {usersListAPI.map((i) => (
          <div
            key={i.id}
            className="w-full rounded-lg shadow flex flex-col items-center justify-center p-4 space-y-2">
            <h2 className="font-bold text-gray-900 pb-3 text-center">{i.name}</h2>
            <p className="font-medium text-sm">{i.email}</p>
            <p className="font-medium text-sm">{i.phone}</p>
            <p className="font-medium text-sm">{i.website}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersListAPI;
