import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '..';

export const useLogout = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    appContext.destroyInstance();
    navigate("/");
  };

  return handleLogout;
};
