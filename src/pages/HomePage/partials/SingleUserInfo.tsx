import { useContext, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type RegisterSchema } from '../../RegisterPage';
import Button from '../../../components/Button';
import { store } from '../../../contexts';

const SingleUserInfo: FC = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(store);
  const { userId } = useParams();

  const user = users.find((u: RegisterSchema) => u.id === userId);

  const handleRemoveUser = (): void => {
    if (user != null) {
      setUsers((prevUsers) => prevUsers.filter((u: RegisterSchema) => u !== user));
      navigate('/');
    }
  };

  return (
    <>
      {user != null ? (
        <>
          <div className="space-y-3">
            <img className="max-h-32" src="./user.png" alt="#" />
            <Button onClick={handleRemoveUser}>Remove</Button>
          </div>
          <div className="space-y-1">
            <h1 className="font-bold text-2xl pb-2">{user?.fullName}</h1>
            <p className="font-medium text-sm">{user?.gender}</p>
            <p className="font-medium text-sm">{user?.email}</p>
            <p className="font-medium text-sm">{user?.phoneNumber}</p>
            <p className="font-medium text-sm">{user?.address}</p>
          </div>
        </>
      ) : (
        <h1 className="text-slate-400">User not found!</h1>
      )}
    </>
  );
};

export default SingleUserInfo;
