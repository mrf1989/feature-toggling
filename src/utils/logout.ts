import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FeatureContext } from '..';

export const useLogout = () => {
  const featureContext = useContext(FeatureContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    featureContext.destroyInstance();
    navigate("/");
  };

  return handleLogout;
};
