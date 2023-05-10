import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState, pricingState, routesState } from "../state";

export const useLogout = () => {
  const [user, setUser] = useRecoilState(userState);
  const [pricing, setPricing] = useRecoilState(pricingState);
  const [routes, setRoutes] = useRecoilState(routesState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    setPricing({});
    setRoutes([]);
    navigate("/");
  };

  return handleLogout;
};
