import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Loginauth() {
  const { isLoggedIn} = useSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default Loginauth;
